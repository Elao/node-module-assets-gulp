'use strict';


var
    Handler = require('../../lib/Handler/Handler'),
    BundlePoolPatternSolver = require('../../lib/Handler/Pool/BundlePoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        handler = new Handler('images', 'Handles images assets');

    // Pools patterns solvers
    handler
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.bundles, assets.fileSystem))
        .addPoolPattern({
            src_dir:  'images',
            dest_dir: 'images',
            glob: '**'
        });

    // Add handler
    assets
        .addHandler(handler);

    // Gulp task
    gulp.task('images', function()
    {
        var
            stream = require('merge-stream')(),
            gulpImagemin = require('gulp-imagemin'),
            gulpChanged = require('gulp-changed'),
            gulpSize = require('gulp-size');

        // Pipeline
        var
            pipeline = function(pool) {
                return gulp.src(pool.getSrc())
                    .pipe(gulpChanged(
                        'web/assets/images'
                    ))
                    .pipe(gulpImagemin, {
                        optimizationLevel: 7
                    })
                    .pipe(gulpSize({
                        showFiles: true,
                        title: pool.getName()
                    }))
                    .pipe(gulp.dest('web/assets/images'));
            };

        assets.getHandler('images').pools.forEach(function(pool) {
            stream.add(
                pipeline(pool)
            );
        });

        return stream;
    });

};
