'use strict';

module.exports = function(gulp, path) {

    // Check gulp injection
    if ((typeof gulp !== 'object') || (gulp.constructor.name !== 'Gulp')) {
        console.error('Error: You must pass a gulp instance as first parameter !');
        process.exit(1);
    }

    var
        Assets = require('./lib/Assets'),
        assets = new Assets(path);

    // Pools patterns resolvers
    var
        AssetsPoolPatternPathResolver = require('./lib/AssetsPoolPatternPathResolver'),
        AssetsPoolPatternGlobResolver = require('./lib/AssetsPoolPatternGlobResolver');

    assets
        .pools
            .addPatternResolver(new AssetsPoolPatternPathResolver(assets.path))
            .addPatternResolver(new AssetsPoolPatternGlobResolver(assets.path));

    // Libraries patterns Resolvers
    var
        AssetsLibraryPatternPathResolver = require('./lib/AssetsLibraryPatternPathResolver'),
        AssetsLibraryPatternPoolsResolver = require('./lib/AssetsLibraryPatternPoolsResolver');

    assets
        .libraries
            .addPatternResolver(new AssetsLibraryPatternPathResolver(assets.path))
            .addPatternResolver(new AssetsLibraryPatternPoolsResolver(assets.pools));


    // Tasks
    require('./tasks/list')(assets, gulp);

    // Plugins
    require('./plugins/images')(assets, gulp);

    return assets;
};
