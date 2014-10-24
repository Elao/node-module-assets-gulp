var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('swf', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('swf')).forEach(function(assetGroup) {

        var
            assetGroupSrc  = assets.getSrc('swf', assetGroup),
            assetGroupDest = assets.getDest('swf', assetGroup);

        tasks.push(
            gulp.src(assetGroupSrc)
                .pipe(plugins.plumber())
                .pipe(plugins.if(
                    plugins.util.env.dev || false,
                    plugins.changed(assetGroupDest)
                ))
                .pipe(plugins.if(
                    plugins.util.env.verbose  || false,
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
                message : "\n" + 'swf',
                onLast  : true
            })
        ));
});
