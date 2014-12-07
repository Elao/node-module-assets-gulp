var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('images', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('images')).forEach(function(assetGroup) {

        var
            assetGroupSrc  = assets.getSrc('images', assetGroup),
            assetGroupDest = assets.getDest('images', assetGroup);

        tasks.push(
            gulp.src(assetGroupSrc)
                .pipe(plugins.plumber())
                .pipe(plugins.if(
                    plugins.util.env.dev || false,
                    plugins.changed(assetGroupDest)
                ))
                .pipe(plugins.if(
                    !plugins.util.env.dev || false,
                    plugins.imagemin()
                ))
                .pipe(plugins.size({showFiles: true}))
                .pipe(gulp.dest(assetGroupDest))
        );
    });

    return !tasks.length ? null : eventStream.merge.apply(this, tasks);
});

// Watch
gulp.task('watch:images', function() {
    var
        plugins = require('gulp-load-plugins')();

    return gulp.watch(assets.getSrcWatch('images'), ['images'])
        .on('change', function(event) {
            // Set current asset group
            assets.setGroup(assets.findGroup('images', event.path));

            // Log
            plugins.util.log(
                'Watched', "'" + plugins.util.colors.cyan(event.path) + "'",
                'has', plugins.util.colors.magenta(event.type)
            );
        });
});
