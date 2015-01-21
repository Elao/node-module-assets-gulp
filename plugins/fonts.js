'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../lib/Pool/BundlePoolPatternSolver'),
    LibraryPoolPatternSolver = require('../lib/Pool/LibraryPoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        poolHandler = new PoolHandler(
            assets.fileSystem,
            'fonts',
            'fonts',
            'Handles fonts assets'
        );

    // Pools Patterns Solvers
    poolHandler
        .addPoolPatternSolver(new BundlePoolPatternSolver(poolHandler, assets.bundles))
        .addPoolPatternSolver(new LibraryPoolPatternSolver(poolHandler, assets.libraries))
        .addPoolPattern({
            srcDir: 'fonts',
            glob:   '**'
        });

    // Pool Handler
    assets
        .addPoolHandler(poolHandler);

    // Pipeline
    var
        pipeline = function(pool, debug, silent) {
            var
                gulpChanged = require('gulp-changed'),
                gulpSize    = require('gulp-size'),
                gulpIf      = require('gulp-if');

            return gulp
                .src(pool.getSrc())
                    .pipe(gulpIf(debug,
                        gulpChanged(pool.getDest())
                    ))
                    .pipe(gulpIf(!silent,
                        gulpSize({
                            showFiles: true,
                            title: pool.getName()
                        })
                    ))
                    .pipe(
                        gulp.dest(pool.getDest())
                    );
        };

    return {
        // Task
        task: function() {
            var
                stream = require('merge-stream')(),
                pools  = poolHandler.pools
                    .find(assets.options.get('pools'));

            if (!pools.length) {
                return null;
            }

            pools.forEach(function(pool) {
                stream.add(
                    pipeline(
                        pool,
                        assets.options.is('debug'),
                        assets.options.is('silent')
                    )
                );
            });

            return stream;
        }
    };
};
