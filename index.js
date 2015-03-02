'use strict';


module.exports = function(options)
{
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

    // Layouts
    assets
        .addLayout = function(type, options) {
            require('./layouts/' + type)(this, options);
            return this;
        };

    return assets;
};
