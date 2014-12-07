var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('css', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('css')).forEach(function(assetGroup) {

        var
            assetGroupSrc    = assets.getSrc('css', assetGroup),
            assetGroupDest   = assets.getDest('css', assetGroup),
            assetGroupConcat = assets.getConcat('css', assetGroup);

        tasks.push(
            gulp.src(assetGroupSrc)
                .pipe(plugins.plumber())
                .pipe(plugins.if(
                    assetGroupConcat ? true : false,
                    plugins.concat(assetGroupConcat ? assetGroupConcat : 'foo')
                ))
                .pipe(plugins.autoprefixer(
                    assets.getAutoprefixer()
                ))
                .pipe(plugins.if(
                    !plugins.util.env.dev || false,
                    plugins.minifyCss()
                ))
                .pipe(plugins.header(
                    assets.getHeader(),
                    assets.getHeaderMeta()
                ))
                .pipe(plugins.size({showFiles: true}))
                .pipe(gulp.dest(assetGroupDest))
        );
    });

    return !tasks.length ? null : eventStream.merge.apply(this, tasks);
});

// Watch
gulp.task('watch:css', function() {
    var
        plugins = require('gulp-load-plugins')();

    return gulp.watch(assets.getSrcWatch('css'), ['css'])
        .on('change', function(event) {
            // Set current asset group
            assets.setGroup(assets.findGroup('css', event.path));

            // Log
            plugins.util.log(
                'Watched', "'" + plugins.util.colors.cyan(event.path) + "'",
                'has', plugins.util.colors.magenta(event.type)
            );
        });
});
