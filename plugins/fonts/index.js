'use strict';


var
    PoolHandler = require('../../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../../lib/Pool/BundlePoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        poolHandler = new PoolHandler('fonts', 'Handles fonts assets');

    // Pools Patterns Solvers
    poolHandler
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.fileSystem, assets.bundles))
        .addPoolPattern({
            srcDir:  'fonts',
            destDir: 'fonts',
            glob: '**'
        });

    // Pool Handler
    assets
        .addPoolHandler(poolHandler);

    // Pipeline
    var
        pipeline = function(pool) {
            var
                gulpChanged = require('gulp-changed'),
                gulpSize = require('gulp-size'),
                gulpIf = require('gulp-if'),
                gulpUtil = require('gulp-util');

            return gulp
                .src(pool.getSrc())
                    .pipe(gulpIf(
                        gulpUtil.env.dev || false,
                        gulpChanged(
                            pool.getDest()
                        )
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
    gulp.task('fonts', function()
    {
        var
            stream = require('merge-stream')(),
            pools  = assets.getPoolHandler('fonts').pools;

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
