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


    // Tasks
    require('./tasks/list')(assets, gulp);
    require('./tasks/clean')(assets, gulp);

    return assets;
};
