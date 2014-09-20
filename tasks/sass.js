var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('sass', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('sass')).forEach(function(assetGroup) {

        var
            assetGroupSrc  = assets.getSrc('sass', assetGroup),
            assetGroupDest = assets.getDest('sass', assetGroup);

        tasks.push(
            gulp.src(assetGroupSrc)
                .pipe(plugins.plumber())
                .pipe(plugins.sass({
                    errLogToConsole: true,
                    includePaths: assets.getVendors(),
                    outputStyle: (plugins.util.env.dev || false) ? 'nested' : 'compressed',
                    precision: 10,
                    sourceComments: (plugins.util.env.dev || false) ? 'map' : 'none'
                }))
                .pipe(plugins.autoprefixer(
                    assets.getAutoprefixer()
                ))
                .pipe(plugins.header(
                    assets.getHeader(),
                    assets.getHeaderMeta()
                ))
                .pipe(plugins.if(
                    plugins.util.env.verbose || false,
                    plugins.size({showFiles: true})
                ))
                .pipe(gulp.dest(assetGroupDest))
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
