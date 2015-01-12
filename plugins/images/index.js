'use strict';


var
    PoolHandler = require('../../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../../lib/Pool/BundlePoolPatternSolver'),
    LibraryPoolPatternSolver = require('../../lib/Pool/LibraryPoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        poolHandler = new PoolHandler(
            assets.fileSystem,
            'images',
            'images',
            'Handles images assets'
        );

    // Pools Patterns Solvers
    poolHandler
        .addPoolPatternSolver(new BundlePoolPatternSolver(poolHandler, assets.bundles))
        .addPoolPatternSolver(new LibraryPoolPatternSolver(poolHandler, assets.libraries))
        .addPoolPattern({
            srcDir: 'images',
            glob:   '**'
        });

    // Pool Handler
    assets
        .addPoolHandler(poolHandler);

    // Pipeline
    var
        pipeline = function(pool, debug) {
            var
                gulpImagemin = require('gulp-imagemin'),
                gulpChanged  = require('gulp-changed'),
                gulpSize     = require('gulp-size'),
                gulpIf       = require('gulp-if');

            return gulp
                .src(pool.getSrc())
                    .pipe(gulpIf(debug,
                        gulpChanged(pool.getDest())
                    ))
                    .pipe(gulpIf(!debug,
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
            pools  = assets.getPoolHandler('images').pools
                .find(assets.options.get('pools'));

        if (!pools.length) {
            return null;
        }

        pools.forEach(function(pool) {
            stream.add(
                pipeline(pool, assets.options.is('debug'))
            );
        });

        return stream;
    });

};
