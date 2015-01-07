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
        pipeline = function(pool, dev) {
            var
                gulpImagemin = require('gulp-imagemin'),
                gulpChanged  = require('gulp-changed'),
                gulpSize     = require('gulp-size'),
                gulpIf       = require('gulp-if');

            return gulp
                .src(pool.getSrc())
                    .pipe(gulpIf(dev,
                        gulpChanged(pool.getDest())
                    ))
                    .pipe(gulpIf(!dev,
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
            gulpUtil = require('gulp-util'),
            stream   = require('merge-stream')(),
            pools    = assets.getPoolHandler('images').pools
                .find(typeof(gulpUtil.env.pools) === 'string' ? gulpUtil.env.pools.split(',') : null);

        if (!pools.length) {
            return null;
        }

        pools.forEach(function(pool) {
            stream.add(
                pipeline(pool, gulpUtil.env.dev || false)
            );
        });

        return stream;
    });

};
