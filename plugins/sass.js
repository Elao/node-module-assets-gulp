'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../lib/Pool/BundlePoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        poolHandler = new PoolHandler(
            assets.fileSystem,
            'sass',
            'css',
            'Handles sass assets'
        );

    // Pools Patterns Solvers
    poolHandler
        .addPoolPatternSolver(new BundlePoolPatternSolver(poolHandler, assets.bundles))
        .addPoolPattern({
            srcDir: 'sass',
            glob:   '**/[!_]*.scss'
        });

    // Pool Handler
    assets
        .addPoolHandler(poolHandler);

    // Pipeline
    var
        pipeline = function(pool, debug, silent) {
            var
                gulpSass = require('gulp-sass'),
                gulpSize = require('gulp-size'),
                gulpIf   = require('gulp-if');

            return gulp
                .src(pool.getSrc())
                    .pipe(gulpSass({
						errLogToConsole: true,
						//includePaths: assets.getComponents(),
						//outputStyle: (plugins.util.env.dev || false) ? 'nested' : 'compressed',
						precision: 10,
						//sourceComments: (plugins.util.env.dev || false) ? 'map' : 'none'
					}))
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
