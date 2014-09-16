var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('files', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('files')).forEach(function(assetGroup) {
        tasks.push(
            gulp.src(assets.getSrc('files', assetGroup))
                .pipe(plugins.plumber())
                .pipe(plugins.if(
                    plugins.util.env.dev || false,
                    plugins.changed(assets.getDest('files', assetGroup))
                ))
                .pipe(plugins.if(
                    plugins.util.env.verbose || false,
                    plugins.size({showFiles: true})
                ))
                .pipe(gulp.dest(assets.getDest('files', assetGroup)))
        );
    });

    return !tasks.length ? null : eventStream.merge.apply(this, tasks)
        .pipe(plugins.if(
            plugins.util.env.notify || false,
            plugins.notify({
                title   : 'Gulp - Success',
                message : "\n" + 'files',
                onLast  : true
            })
        ));
});
