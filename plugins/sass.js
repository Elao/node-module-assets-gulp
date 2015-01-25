'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../lib/Pool/BundlePoolPatternSolver');


module.exports = function(assets, gulp, options)
{
    var
        handler = new PoolHandler(
            assets.fileSystem,
            'sass',
            'css',
            'Handles sass assets'
        );

    // Pools Patterns Solvers
    handler
        .addPoolPatternSolver(new BundlePoolPatternSolver(handler, assets.bundles))
        .addPoolPattern({
            srcDir: 'sass',
            glob:   '**/[!_]*.scss'
        });

    // Pool Handler
    assets
        .addPoolHandler(handler);

    // Options
    options = require('defaults')(options || {}, {
        precision: 10
    });


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
                        outputStyle:     'nested',
                        precision:       options.precision,
                        includePaths:    assets.libraries.getPaths()
                            .concat(handler.pools.getPaths())
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
