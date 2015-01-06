'use strict';


var
    PoolHandler = require('../../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../../lib/Pool/BundlePoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        poolHandler = new PoolHandler('images', 'Handles images assets');

    // Pools Patterns Solvers
    poolHandler
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.fileSystem, assets.bundles))
        .addPoolPattern({
            srcDir:  'images',
            destDir: 'images',
            glob: '**'
        });

    // Pool Handler
    assets
        .addPoolHandler(poolHandler);

    // Pipeline
    var
        pipeline = function(pool) {
            var
                gulpImagemin = require('gulp-imagemin'),
                gulpChanged = require('gulp-changed'),
                gulpSize = require('gulp-size'),
                gulpIf = require('gulp-if');

            return gulp
                .src(pool.getSrc())
                    .pipe(gulpIf(
                        true,
                        gulpChanged(
                            pool.getDest()
                        )
                    ))
                    .pipe(gulpIf(
                        true,
                        gulpImagemin({
                            optimizationLevel: 7
                        })
                    ))
                    .pipe(
                        gulpSize({
                            showFiles: true,
                            title: pool.getName()
                        })
                    )
                    .pipe(
                        gulp.dest(pool.getDest())
                    );
        };

    // Gulp Task
    gulp.task('images', function()
    {
        var
            stream = require('merge-stream')(),
            pools  = assets.getPoolHandler('images').pools;

        if (!pools.count()) {
            return null;
        }

        pools.forEach(function(pool) {
            stream.add(
                pipeline(pool)
            );
        });

        return stream;
    });

};
