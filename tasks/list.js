'use strict';

module.exports = function(assets, gulp)
{
    // List
    gulp.task('list', ['list:bundles', 'list:libraries', 'list:pools']);

    // List - Bundles
    gulp.task('list:bundles', function(callback)
    {
        var
            gutil = require('gulp-util');

        gutil.log(gutil.colors.cyan(assets.bundles.count()), 'bundles have been solved');

        assets.bundles.forEach(function(bundle) {
            gutil.log('-', bundle.getId(), gutil.colors.magenta(bundle.getPath()));
            if (bundle.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(bundle.getDescription()));
            }
        });

        callback();
    });

    // List - Libraries
    gulp.task('list:libraries', function(callback)
    {
        var
            gutil = require('gulp-util');

        gutil.log(gutil.colors.cyan(assets.libraries.count()), 'libraries have been solved');

        assets.libraries.forEach(function(library) {
            gutil.log('-', gutil.colors.magenta(library.getPath()));
            if (library.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(library.getDescription()));
            }
        });

        callback();
    });

    // List - Pools
    gulp.task('list:pools', function(callback)
    {
        var
            gutil = require('gulp-util');

        gutil.log(gutil.colors.cyan(assets.poolHandlers.count()), 'pool handlers have been added');

        // Pool Handlers
        assets.poolHandlers.forEach(function(poolHandler) {

            gutil.log('-', poolHandler.getId());
            if (poolHandler.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(poolHandler.getDescription()));
            }

            // Pools
            gutil.log('    ', gutil.colors.cyan(poolHandler.pools.count()), 'pools have been solved');
            poolHandler.pools.forEach(function(pool) {
                gutil.log('     -', pool.getName());
                gutil.log('      ', gutil.colors.cyan('src: '), gutil.colors.magenta(pool.getSrc()));
                gutil.log('      ', gutil.colors.cyan('dest:'), gutil.colors.magenta(pool.getDest()));
            });
        });

        callback();
    });
};
