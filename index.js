'use strict';

module.exports = function(gulp, path)
{
    // Check gulp injection
    if ((typeof gulp !== 'object') || (gulp.constructor.name !== 'Gulp')) {
        console.error('Error: You must pass a gulp instance as first parameter !');
        process.exit(1);
    }

    var
        Assets = require('./lib/Assets'),
        assets = new Assets(path);

    // Bundles patterns resolvers
    var
        AssetsBundlePatternPathResolver = require('./lib/AssetsBundlePatternPathResolver'),
        AssetsBundlePatternGlobResolver = require('./lib/AssetsBundlePatternGlobResolver');

    assets
        .addBundlePatternResolver(new AssetsBundlePatternPathResolver(assets.path))
        .addBundlePatternResolver(new AssetsBundlePatternGlobResolver(assets.path));

    // Libraries patterns Resolvers
    var
        AssetsLibraryPatternPathResolver = require('./lib/AssetsLibraryPatternPathResolver'),
        AssetsLibraryPatternBundlesResolver = require('./lib/AssetsLibraryPatternBundlesResolver');

    assets
        .addLibraryPatternResolver(new AssetsLibraryPatternPathResolver(assets.path))
        .addLibraryPatternResolver(new AssetsLibraryPatternBundlesResolver(assets.bundles));


    // Tasks
    require('./tasks/list')(assets, gulp);

    // Plugins
    require('./plugins/images')(assets, gulp);

    return assets;
};
