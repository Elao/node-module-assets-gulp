var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('fonts', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('fonts')).forEach(function(assetGroup) {
        tasks.push(
            gulp.src(assets.getSrc('fonts', assetGroup))
                .pipe(plugins.plumber())
                .pipe(plugins.if(
                    plugins.util.env.dev || false,
                    plugins.changed(assets.getDest('fonts', assetGroup))
                ))
                .pipe(plugins.if(
                    plugins.util.env.verbose || false,
                    plugins.size({showFiles: true})
                ))
                .pipe(gulp.dest(assets.getDest('fonts', assetGroup)))
        );
    });

    return !tasks.length ? null : eventStream.merge.apply(this, tasks)
        .pipe(plugins.if(
            plugins.util.env.notify || false,
            plugins.notify({
                title   : 'Gulp - Success',
                message : "\n" + 'fonts',
                onLast  : true
            })
        ));
});

// Watch
gulp.task('watch:fonts', function() {
    var
        plugins = require('gulp-load-plugins')();

    return gulp.watch(assets.getSrcWatch('fonts'), ['fonts'])
        .on('change', function(event) {
            // Set current asset group
            assets.setGroup(assets.findGroup('fonts', event.path));

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
gulp.task('clean:fonts', function(callback) {
    var
        rimraf = require('rimraf');

    rimraf(assets.getDest('fonts'), callback);
});
