var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('files', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('files')).forEach(function(assetGroup) {
        
        var
            assetGroupSrc    = assets.getSrc('files', assetGroup),
            assetGroupDest   = assets.getDest('files', assetGroup)
            assetGroupConcat = assets.getConcat('files', assetGroup);

        tasks.push(
            gulp.src(assetGroupSrc)
                .pipe(plugins.plumber())
                .pipe(plugins.if(
                    plugins.util.env.dev || false,
                    plugins.changed(assetGroupDest)
                ))
                .pipe(plugins.if(
                    assetGroupConcat ? true : false,
                    plugins.concat(assetGroupConcat ? assetGroupConcat : 'foo')
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
                message : "\n" + 'files',
                onLast  : true
            })
        ));
});
