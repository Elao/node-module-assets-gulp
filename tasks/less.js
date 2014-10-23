var
    gulp   = require('gulp'),
    assets = require('..');

gulp.task('less', function() {
    var
        plugins     = require('gulp-load-plugins')(),
        eventStream = require('event-stream'),
        tasks       = [];

    Object.keys(assets.get('less')).forEach(function(assetGroup) {

        var
            assetGroupSrc  = assets.getSrc('less', assetGroup),
            assetGroupDest = assets.getDest('less', assetGroup);

        tasks.push(
            gulp.src(assetGroupSrc)
                .pipe(plugins.plumber())
                .pipe(plugins.less({
                    paths: assets.getVendors(),
                    compress: (plugins.util.env.dev || false) ? false : true,
                    sourceMap: (plugins.util.env.dev || false) ? true : false
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
                message : "\n" + 'less',
                onLast  : true
            })
        ));
});

// Watch
gulp.task('watch:less', function() {
    var
        plugins = require('gulp-load-plugins')();

    return gulp.watch(assets.getSrcWatch('less'), ['less'])
        .on('change', function(event) {
            // Set current asset group
            assets.setGroup(assets.findGroup('less', event.path));

            // Log
            if (plugins.util.env.verbose || false) {
                plugins.util.log(
                    'Watched', "'" + plugins.util.colors.cyan(event.path) + "'",
                    'has', plugins.util.colors.magenta(event.type)
                );
            }
        });
});
