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


    // Gulp Task - List
    gulp.task('list', ['list:bundles', 'list:libraries', 'list:pools']);

    // Gulp Task - List Bundles
    gulp.task('list:bundles', function(callback)
    {
        var
            gulpUtil = require('gulp-util'),
            bundles  = assets.bundles.find();

        gulpUtil.log('Found', gulpUtil.colors.cyan(bundles.length), 'bundles');

        bundles.forEach(function(bundle) {
            gulpUtil.log('-', bundle.getId(), gulpUtil.colors.magenta(bundle.getPath()));
            if (bundle.hasDescription()) {
                gulpUtil.log(' ', gulpUtil.colors.cyan(bundle.getDescription()));
            }
        });

        callback();
    });

    // Gulp Task - List Libraries
    gulp.task('list:libraries', function(callback)
    {
        var
            gulpUtil  = require('gulp-util'),
            libraries = assets.libraries.find();

        gulpUtil.log('Found', gulpUtil.colors.cyan(libraries.length), 'libraries');

        libraries.forEach(function(library) {
            gulpUtil.log('-', gulpUtil.colors.magenta(library.getPath()));
            if (library.hasDescription()) {
                gulpUtil.log(' ', gulpUtil.colors.cyan(library.getDescription()));
            }
        });

        callback();
    });

    // Gulp Task - List Pools
    gulp.task('list:pools', function(callback)
    {
        var
            gulpUtil = require('gulp-util');

        gulpUtil.log('Added', gulpUtil.colors.cyan(assets.poolHandlers.length), 'pool handlers');

        // Pool Handlers
        assets.poolHandlers.forEach(function(poolHandler)
        {
            var
                pools;

            gulpUtil.log('-', poolHandler.getId());
            if (poolHandler.hasDescription()) {
                gulpUtil.log(' ', gulpUtil.colors.cyan(poolHandler.getDescription()));
            }

            // Pools
            pools = poolHandler.pools.find();
            gulpUtil.log('     Found', gulpUtil.colors.cyan(pools.length), 'pools');
            pools.forEach(function(pool) {
                gulpUtil.log('     -', pool.getName());
                gulpUtil.log('      ', gulpUtil.colors.cyan('path:'), gulpUtil.colors.magenta(pool.getPath()));
                gulpUtil.log('      ', gulpUtil.colors.cyan('src: '), gulpUtil.colors.magenta(pool.getSrc()));
                gulpUtil.log('      ', gulpUtil.colors.cyan('dest:'), gulpUtil.colors.magenta(pool.getDest()));
            });
        });

        callback();
    });

    return assets;
};
