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
                // Standalone
                standalone: config.standalone ? config.standalone : null,
                // No parsing
                noParse: ['jquery']
            }
        ),
        transform = function() {
            var
                path   = require('path'),
                buffer = require('vinyl-buffer')
                source = require('vinyl-source-stream');

            return bundler
                .bundle()
                    .pipe(plugins.plumber())
                    .pipe(source(path.relative(base, asset)))
                    .pipe(buffer())
                    .pipe(plugins.if(
                        !plugins.util.env.dev || false,
                        plugins.uglify()
                    ))
                    .pipe(plugins.if(
                        !plugins.util.env.dev || false,
                        plugins.header(
                            assets.getHeader(),
                            assets.getHeaderMeta()
                        )
                    ))
                    .pipe(plugins.size({showFiles: true}))
                    .pipe(gulp.dest(dest));
        };

    // Require
    if (config.require) {
        bundler.require(config.require);
    }

    // Exclude
    if (config.exclude) {
        bundler.exclude(config.exclude);
    }

    // External
    if (config.external) {
        bundler.external(config.external);
    }

    // Watch
    if (watch) {
        bundler = require('watchify')(bundler, {poll: true});
        // Rebundle with watchify on changes.
        bundler.on('update', function(path) {
            // Log
            plugins.util.log(
                'Watched', "'" + plugins.util.colors.cyan(path) + "'",
                'has', plugins.util.colors.magenta('changed')
            );
            transform();
        });

        return bundler.bundle().on('data', function() {});
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

    return !tasks.length ? null : eventStream.merge.apply(this, tasks);
});

gulp.task('watch:js', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        glob        = require('glob'),
        glob2base   = require('glob2base');

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

            bundle(
                asset,
                base,
                assetGroupDest,
                config,
                true
            );
        });
    });
});
