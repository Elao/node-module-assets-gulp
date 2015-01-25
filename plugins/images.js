'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../lib/Pool/BundlePoolPatternSolver'),
    LibraryPoolPatternSolver = require('../lib/Pool/LibraryPoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        handler = new PoolHandler(
            assets.fileSystem,
            'images',
            'images',
            'Handles images assets'
        );

    // Pools Patterns Solvers
    handler
        .addPoolPatternSolver(new BundlePoolPatternSolver(handler, assets.bundles))
        .addPoolPatternSolver(new LibraryPoolPatternSolver(handler, assets.libraries))
        .addPoolPattern({
            srcDir: 'images',
            glob:   '**'
        });

    // Pool Handler
    assets
        .addPoolHandler(handler);

    // Pipeline
    var
        pipeline = function(pool, debug, silent) {
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
                pools  = handler.pools
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
