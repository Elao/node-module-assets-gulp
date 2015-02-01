'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../lib/Pool/BundlePoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        handler = new PoolHandler(
            assets.fileSystem,
            'browserify',
            'js',
            'Handles browserify assets'
        );

    // Pools Patterns Solvers
    handler
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.bundles))
        .addPoolPattern({
            srcDir: 'js',
            glob:   '**/[!_]*.js'
        });

    // Pool Handler
    assets
        .addPoolHandler(handler);


    // Pipeline
    var
        pipeline = function(pool, debug, silent) {
            var
                //source         = require('vinyl-source-stream'),
                buffer         = require('vinyl-buffer'),
                gulpSourcemaps = require('gulp-sourcemaps'),
                gulpUglify     = require('gulp-uglify'),
                gulpSize       = require('gulp-size'),
                gulpIf         = require('gulp-if'),
                dest           = handler.getDestPath(
                    pool.getDest()
                ),
                bundler        = require('browserify')(
                    pool.getSrc(),
                    {
                        //debug: true
                    }
                );

            return bundler
                .bundle()
                //.pipe(source(getBundleName() + '.js'))
                .pipe(buffer())
                .pipe(gulpIf(debug,
                    gulpSourcemaps.init()
                ))
                .pipe(gulpIf(!debug,
                    gulpUglify()
                ))
                .pipe(gulpIf(debug,
                    gulpSourcemaps.write()
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
                PoolFlattenizer = require('../lib/Pool/Flattenizer/Flattenizer'),
                mergeStream = require('merge-stream'),
                poolFlattenizer, pools, stream;

            pools = handler.pools
                .find(assets.options.get('pools'));

            if (!pools.length) {
                return null;
            }

            stream = mergeStream();

            poolFlattenizer = new PoolFlattenizer(assets.fileSystem);

            pools.forEach(function(pool) {
                poolFlattenizer.flatten(pool).forEach(function(flattenPool) {
                    stream.add(
                        pipeline(
                            flattenPool,
                            assets.options.is('debug'),
                            assets.options.is('silent')
                        )
                    );
                });
            });

            return stream;
        }
    };
};
