var
    gulp   = require('gulp'),
    assets = require('..');

function bundle(asset, base, dest, config, watch) {

    var
        plugins = require('gulp-load-plugins')(),
        bundler = require('browserify')(
            asset, {
                debug: plugins.util.env.dev || false,
                paths: assets.getVendors(),
                // Watchify
                cache: {},
                packageCache: {},
                fullPaths: watch
            }
        ),
        transform  = function() {
            var
                path   = require('path'),
                source = require('vinyl-source-stream');

            return bundler
                .bundle()
                .pipe(plugins.plumber())
                .pipe(source(path.relative(base, asset)))
                .pipe(plugins.if(
                    !plugins.util.env.dev || false,
                    plugins.streamify(plugins.uglify())
                ))
                .pipe(plugins.header(assets.getHeader(), assets.getHeaderMeta()))
                .pipe(plugins.if(
                    plugins.util.env.verbose || false,
                    plugins.streamify(plugins.size({showFiles: true}))
                ))
                .pipe(gulp.dest(dest));
        };

    // Exclude
    if (config.exclude) {
        bundler.exclude(config.exclude);
    }

    // Watch
    if (watch) {
        bundler = require('watchify')(bundler);
        // Rebundle with watchify on changes.
        bundler.on('update', transform);
    }

    return transform();
}

gulp.task('js', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        glob        = require('glob'),
        glob2base   = require('glob2base'),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('js')).forEach(function(assetGroup) {
        var
            globber = glob.Glob(assets.getSrc('js', assetGroup), {sync: true}),
            base    = glob2base(globber);

        globber.found.forEach(function(asset) {

            var
                assetGroupDest    = assets.getDest('js', assetGroup),
                assetGroupBundles = assets.getBundles('js', assetGroup),
                config = {};

            if (assetGroupBundles[asset.replace(base, '')]) {
                config = assetGroupBundles[asset.replace(base, '')];
            }

            tasks.push(
                bundle(
                    asset,
                    base,
                    assetGroupDest,
                    config,
                    false
                )
            );
        });
    });

    return !tasks.length ? null : eventStream.merge.apply(this, tasks)
        .pipe(plugins.if(
            plugins.util.env.notify || false,
            plugins.notify({
                title   : 'Gulp - Success',
                message : "\n" + 'js',
                onLast  : true
            })
        ));
});

gulp.task('watch:js', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        glob        = require('glob'),
        glob2base   = require('glob2base'),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('js')).forEach(function(assetGroup) {
        var
            globber = glob.Glob(assets.getSrcWatch('js', assetGroup), {sync: true}),
            base    = glob2base(globber);

        globber.found.forEach(function(asset) {

            var
                assetGroupDest    = assets.getDest('js', assetGroup),
                assetGroupBundles = assets.getBundles('js', assetGroup),
                config = {};

            if (assetGroupBundles[asset.replace(base, '')]) {
                config = assetGroupBundles[asset.replace(base, '')];
            }

            tasks.push(
                bundle(
                    asset,
                    base,
                    assetGroupDest,
                    config,
                    true
                )
            );
        });
    });

    return !tasks.length ? null : eventStream.merge.apply(this, tasks);
});

// Lint
gulp.task('lint:js', function() {
    var
        plugins = require('gulp-load-plugins')();

    return gulp.src(assets.getSrc('js'))
        .pipe(plugins.jshint('app/Resources/jshint.json'))
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jscs('app/Resources/jscs.json'));
});
