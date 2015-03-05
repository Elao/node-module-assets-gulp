'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../lib/Pool/BundlePoolPatternSolver'),
    LibraryPoolPatternSolver = require('../lib/Pool/LibraryPoolPatternSolver');


module.exports = function(assets, options)
{
    var
        gulp = require('gulp'),
        handler;

    // Options
    options = require('defaults')(options || {}, {
        id:          'copy',
        srcDir:      options.dir ? options.dir : null,
        destDir:     options.dir ? options.dir : null,
        glob:        '**',
        description: 'Copy assets'
    });

    if (!options.srcDir || !options.destDir) {
        throw new Error('Either a dir, srcDir or destDir must be set on copy plugin');
    }

    // Handler
    handler = new PoolHandler(
        assets.fileSystem,
        options.id,
        options.destDir,
        options.description
    );

    assets
        .addPoolHandler(handler);

    // Pools Patterns Solvers
    handler
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.bundles))
        .addPoolPatternSolver(new LibraryPoolPatternSolver(assets.libraries))
        .addPoolPattern({
            srcDir: options.srcDir,
            glob:   options.glob
        });

    // Gulp pipeline
    function gulpPipeline(pool, debug, silent) {
        var
            gulpChanged = require('gulp-changed'),
            gulpSize    = require('gulp-size'),
            gulpIf      = require('gulp-if'),
            src         = pool.getSrc(),
            dest        = handler.getDestPath(pool.getDest());

        return gulp
            .src(src)
                .pipe(gulpIf(debug,
                    gulpChanged(dest)
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

    return {
        // Gulp task
        gulpTask: function() {
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
                    gulpPipeline(
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
