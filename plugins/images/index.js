'use strict';


var
    PoolHandler = require('../../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../../lib/Pool/BundlePoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        poolHandler = new PoolHandler('images', 'Handles images assets');

    // Pools patterns solvers
    poolHandler
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.fileSystem, assets.bundles))
        .addPoolPattern({
            srcDir:  'images',
            destDir: 'images',
            glob: '**'
        });

    // Add pool handler
    assets
        .addPoolHandler(poolHandler);

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
                        pool.getDest()
                    ))
                    .pipe(gulpImagemin({
                        optimizationLevel: 7
                    }))
                    .pipe(gulpSize({
                        showFiles: true,
                        title: pool.getName()
                    }))
                    .pipe(gulp.dest(pool.getDest()));
            };

        assets.getPoolHandler('images').pools.forEach(function(pool) {
            stream.add(
                pipeline(pool)
            );
        });

        return stream;
    });

};
