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
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.bundles))
        .addPoolPatternSolver(new LibraryPoolPatternSolver(assets.libraries))
        .addPoolPattern({
            srcDir: 'images',
            glob:   '**'
        });

    // Pool Handler
    assets
        .addPoolHandler(handler);

    // Pipeline
    function pipeline(pool, debug, silent) {
        var
            gulpImagemin = require('gulp-imagemin'),
            gulpChanged  = require('gulp-changed'),
            gulpSize     = require('gulp-size'),
            gulpIf       = require('gulp-if'),
            src          = pool.getSrc(),
            dest         = handler.getDestPath(pool.getDest()),
            args         = {
                optimizationLevel: 7
            };

        return gulp
            .src(src)
                .pipe(gulpIf(debug,
                    gulpChanged(dest)
                ))
                .pipe(gulpIf(!debug,
                    gulpImagemin(args)
                ))
                .pipe(gulpIf(!silent,
                    gulpSize({
                        showFiles: true,
                        title: pool.getName()
                    })
                ))
                .pipe(
                    gulp.dest(dest)
                );
    };

    return {
        // Task
        task: function() {
            var
                mergeStream = require('merge-stream'),
                pools,
                stream;

            pools = handler.pools
                .find(assets.options.get('pools'));

            if (!pools.length) {
                return null;
            }

            stream = mergeStream();

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
