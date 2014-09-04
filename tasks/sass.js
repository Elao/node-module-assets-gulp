var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('sass', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('sass')).forEach(function(assetGroup) {
        tasks.push(
            gulp.src(assets.getSrc('sass', assetGroup))
                .pipe(plugins.plumber())
                .pipe(plugins.sass({
                    errLogToConsole: true,
                    includePaths: assets.options.includes,
                    outputStyle: (plugins.util.env.dev || false) ? 'nested' : 'compressed',
                    precision: 10,
                    sourceComments: (plugins.util.env.dev || false) ? 'map' : 'none'
                }))
                .pipe(plugins.header(assets.getHeader(), assets.getHeaderMeta()))
                .pipe(plugins.if(
                    plugins.util.env.verbose || false,
                    plugins.size({showFiles: true})
                ))
                .pipe(gulp.dest(assets.getDest('sass', assetGroup)))
        );
    });

    return !tasks.length ? null : eventStream.merge.apply(this, tasks)
        .pipe(plugins.if(
            plugins.util.env.notify || false,
            plugins.notify({
                title   : 'Gulp - Success',
                message : "\n" + 'sass',
                onLast  : true
            })
        ));
});

// Watch
gulp.task('watch:sass', function() {
    var
        plugins = require('gulp-load-plugins')();

    return gulp.watch(assets.getSrcWatch('sass'), ['sass'])
        .on('change', function(event) {
            // Set current asset group
            assets.setGroup(assets.findGroup('sass', event.path));

            // Log
            if (plugins.util.env.verbose || false) {
                plugins.util.log(
                    'Watched', "'" + plugins.util.colors.cyan(event.path) + "'",
                    'has', plugins.util.colors.magenta(event.type)
                );
            }
        });
});

// Lint
gulp.task('lint:sass', function() {
    var
        plugins = require('gulp-load-plugins')();

    return gulp.src(assets.getSrc('sass'))
        .pipe(plugins.scssLint({
            config: 'app/Resources/scss-lint.yml'
        }));
});

// Clean
gulp.task('clean:sass', function(callback) {
    var
        rimraf = require('rimraf');

    rimraf(assets.getDest('sass'), callback);
});
