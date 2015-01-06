'use strict';


module.exports = function(gulp, options)
{
    // Check gulp injection
    if ((typeof gulp !== 'object') || (gulp.constructor.name !== 'Gulp')) {
        console.error('Error: You must pass a gulp instance as first parameter !');
        process.exit(1);
    }

    var
        Assets = require('./lib/Assets'),
        assets = new Assets(options);

    // Bundles patterns solvers
    var
        BundlePatternSolver = require('./lib/Bundle/BundlePatternSolver'),
        GlobBundlePatternSolver = require('./lib/Bundle/GlobBundlePatternSolver');

    assets
        .addBundlePatternSolver(new BundlePatternSolver(assets.fileSystem))
        .addBundlePatternSolver(new GlobBundlePatternSolver(assets.fileSystem));

    // Libraries patterns solvers
    var
        LibraryPatternSolver = require('./lib/Library/LibraryPatternSolver'),
        BundleLibraryPatternSolver = require('./lib/Library/BundleLibraryPatternSolver');

    assets
        .addLibraryPatternSolver(new LibraryPatternSolver(assets.fileSystem))
        .addLibraryPatternSolver(new BundleLibraryPatternSolver(assets.bundles));


    // Task : List
    gulp.task('list', ['list:bundles', 'list:libraries', 'list:pools']);

    // List - Bundles
    gulp.task('list:bundles', function(callback)
    {
        var
            gulpUtil = require('gulp-util');

        gulpUtil.log(gulpUtil.colors.cyan(assets.bundles.count()), 'bundles have been solved');

        assets.bundles.forEach(function(bundle) {
            gulpUtil.log('-', bundle.getId(), gulpUtil.colors.magenta(bundle.getPath()));
            if (bundle.hasDescription()) {
                gulpUtil.log(' ', gulpUtil.colors.cyan(bundle.getDescription()));
            }
        });

        callback();
    });

    // Task : List - Libraries
    gulp.task('list:libraries', function(callback)
    {
        var
            gulpUtil = require('gulp-util');

        gulpUtil.log(gulpUtil.colors.cyan(assets.libraries.count()), 'libraries have been solved');

        assets.libraries.forEach(function(library) {
            gulpUtil.log('-', gulpUtil.colors.magenta(library.getPath()));
            if (library.hasDescription()) {
                gulpUtil.log(' ', gulpUtil.colors.cyan(library.getDescription()));
            }
        });

        callback();
    });

    // Task : List - Pools
    gulp.task('list:pools', function(callback)
    {
        var
            gulpUtil = require('gulp-util');

        gulpUtil.log(gulpUtil.colors.cyan(assets.poolHandlers.count()), 'pool handlers have been added');

        // Pool Handlers
        assets.poolHandlers.forEach(function(poolHandler) {

            gulpUtil.log('-', poolHandler.getId());
            if (poolHandler.hasDescription()) {
                gulpUtil.log(' ', gulpUtil.colors.cyan(poolHandler.getDescription()));
            }

            // Pools
            gulpUtil.log('    ', gulpUtil.colors.cyan(poolHandler.pools.count()), 'pools have been solved');
            poolHandler.pools.forEach(function(pool) {
                gulpUtil.log('     -', pool.getName());
                gulpUtil.log('      ', gulpUtil.colors.cyan('src: '), gulpUtil.colors.magenta(pool.getSrc()));
                gulpUtil.log('      ', gulpUtil.colors.cyan('dest:'), gulpUtil.colors.magenta(pool.getDest()));
            });
        });

        callback();
    });

    return assets;
};
