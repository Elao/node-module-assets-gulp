var
    gulp   = require('gulp'),
    assets = require('..');

function bundle(asset, base, dest, watch) {
    var
        plugins    = require('gulp-load-plugins')(),
        browserify = require('browserify'),
        watchify   = require('watchify'),
        bundler    = browserify(
            asset, {
                debug: plugins.util.env.dev || false,
                // Watchify
                cache: {},
                packageCache: {},
                fullPaths: true
            }
        ),
        transform  = function() {
            var
                path       = require('path'),
                source     = require('vinyl-source-stream');

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

     if (watch) {
        bundler = watchify(bundler);
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
            tasks.push(
                bundle(
                    asset,
                    base,
                    assets.getDest('js', assetGroup),
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
            tasks.push(
                bundle(
                    asset,
                    base,
                    assets.getDest('js', assetGroup),
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

// Clean
gulp.task('clean:js', function(callback) {
    var
        rimraf = require('rimraf');

    rimraf(assets.getDest('js'), callback);
});
