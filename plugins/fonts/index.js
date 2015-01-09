'use strict';


var
    PoolHandler = require('../../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../../lib/Pool/BundlePoolPatternSolver'),
    LibraryPoolPatternSolver = require('../../lib/Pool/LibraryPoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        poolHandler = new PoolHandler('fonts', 'Handles fonts assets');

    // Pools Patterns Solvers
    poolHandler
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.fileSystem, assets.bundles))
        .addPoolPatternSolver(new LibraryPoolPatternSolver(assets.fileSystem, assets.libraries))
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
        pipeline = function(pool, debug) {
            var
                gulpChanged = require('gulp-changed'),
                gulpSize    = require('gulp-size'),
                gulpIf      = require('gulp-if');

            return gulp
                .src(pool.getSrc())
                    .pipe(gulpIf(debug,
                        gulpChanged(pool.getDest())
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
            pools  = assets.getPoolHandler('fonts').pools
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