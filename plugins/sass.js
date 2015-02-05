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
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.bundles))
        .addPoolPattern({
            srcDir: 'sass',
            glob:   '**/[!_]*.scss'
        });

    // Pool Handler
    assets
        .addPoolHandler(handler);

    // Options
    options = require('defaults')(options || {}, {
        precision: 10,
        browsers:  ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
    });

    // Pipeline
    function pipeline(pool, debug, silent) {
        var
            gulpSass         = require('gulp-sass'),
            gulpSourcemaps   = require('gulp-sourcemaps'),
            gulpAutoprefixer = require('gulp-autoprefixer'),
            gulpMinifyCss    = require('gulp-minify-css'),
            gulpSize         = require('gulp-size'),
            gulpIf           = require('gulp-if'),
            src              = pool.getSrc(),
            dest             = handler.getDestPath(pool.getDest()),
            args             = {
                errLogToConsole: true,
                outputStyle:     'nested',
                precision:       options.precision,
                includePaths:    assets.libraries.getPaths()
            };

        return gulp
            .src(src)
                .pipe(gulpIf(debug,
                    gulpSourcemaps.init()
                ))
                .pipe(
                    gulpSass(args)
                )
                .pipe(
                    gulpAutoprefixer({
                        browsers: options.browsers,
                    })
                )
                .pipe(gulpIf(!debug,
                    gulpMinifyCss({
                        keepSpecialComments: 1
                    })
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
                mergeStream = require('merge-stream'),
                pools, stream;

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
        },
        // Watch
        watch: function() {
            var
                PoolFlattenizer = require('../lib/Pool/Flattenizer/Flattenizer'),
                sassGraph = require('sass-graph'),
                poolFlattenizer,
                pools,
                map = {};

            pools = handler.pools
                .find(assets.options.get('pools'));

            if (!pools.length) {
                return null;
            }

            poolFlattenizer = new PoolFlattenizer(assets.fileSystem);

            pools.forEach(function(pool) {
                poolFlattenizer.flatten(pool).forEach(function(flattenPool) {
                    Object.keys(
                        sassGraph.parseFile(
                            flattenPool.getSrc(),
                            {
                                loadPaths: assets.libraries.getPaths()
                            }
                        ).index
                    ).forEach(function(file) {
                        if (!map[file]) {
                            map[file] = [flattenPool];
                        } else {
                            map[file].push(flattenPool);
                        }
                    });
                });
            });

            return gulp.watch(Object.keys(map), function(event) {
                if (event.type === 'changed' || event.type === 'deleted') {
                    map[event.path].forEach(function(pool) {
                        pipeline(
                            pool,
                            assets.options.is('debug'),
                            assets.options.is('silent')
                        );
                    });
                }
            });
        }
    };
};
