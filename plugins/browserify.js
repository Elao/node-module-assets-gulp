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
            'Handles js assets with browserify'
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
    function pipeline(pool, debug, silent, watch) {
        var
            browserify     = require('browserify'),
            source         = require('vinyl-source-stream'),
            buffer         = require('vinyl-buffer'),
            gulpSourcemaps = require('gulp-sourcemaps'),
            gulpUglify     = require('gulp-uglify'),
            gulpSize       = require('gulp-size'),
            gulpIf         = require('gulp-if'),
            path           = require('path'),
            src            = './' +  pool.getSrc(),
            dest           = handler.getDestPath(pool.getDest()),
            args           = {
                paths:   assets.libraries.getPaths(),
                noParse: ['jquery']
            },
            bundler;

        function bundle() {
            return bundler.bundle()
                .pipe(source(path.basename(src)))
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
        }

        if (watch || false) {
            var
                watchify = require('watchify'),
                defaults = require('defaults');

            bundler  = watchify(
                browserify(src, defaults(
                    args,
                    watchify.args
                ))
            );

            bundler.on('update', bundle);

            return bundler.bundle();
        } else {
            bundler = browserify(src, args);

            return bundle();
        }
    }

    function task(watch) {
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
                        assets.options.is('silent'),
                        watch || false
                    )
                );
            });
        });

        return stream;
    }

    return {
        // Task
        task: function() {
            return task();
        },
        // Watch
        watch: function() {
            return task(true);
        }
    };
};
