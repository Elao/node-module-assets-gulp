var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('images', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('images')).forEach(function(assetGroup) {
        tasks.push(
            gulp.src(assets.get('images')[assetGroup].src)
                .pipe(plugins.plumber())
                .pipe(plugins.if(
                    plugins.util.env.dev || false,
                    plugins.changed(assets.get('images')[assetGroup].dest)
                ))
                .pipe(plugins.if(
                    !plugins.util.env.dev || false,
                    plugins.imagemin()
                ))
                .pipe(plugins.if(
                    plugins.util.env.verbose  || false,
                    plugins.size({showFiles: true})
                ))
                .pipe(gulp.dest(assets.get('images')[assetGroup].dest))
        );
    });

    return !tasks.length ? null : eventStream.merge.apply(this, tasks)
        .pipe(plugins.if(
            plugins.util.env.notify || false,
            plugins.notify({
                title   : 'Gulp - Success',
                message : "\n" + 'images',
                onLast  : true
            })
        ));
});

// Watch
gulp.task('watch:images', function() {
    var
        plugins = require('gulp-load-plugins')();

    return gulp.watch(assets.getSrc('images'), ['images'])
        .on('change', function(event) {
            // Set current asset group
            assets.setGroup(assets.findGroup('images', event.path));

            // Log
            if (plugins.util.env.verbose || false) {
                plugins.util.log(
                    'Watched', "'" + plugins.util.colors.cyan(event.path) + "'",
                    'has', plugins.util.colors.magenta(event.type)
                );
            }
        });
});

// Clean
gulp.task('clean:images', function(callback) {
    var
        rimraf = require('rimraf');

    rimraf(assets.getDest('images'), callback);
});
