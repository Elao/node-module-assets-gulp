'use strict';

module.exports = function(gulp, path) {

    // Check gulp injection
    if ((typeof gulp !== 'object') || (gulp.constructor.name !== 'Gulp')) {
        console.error('Error: You must pass a gulp instance as first parameter !');
        process.exit(1);
    }

    // Assets
    var
        Assets = require('./lib/Assets'),
        assets = new Assets(path);

    // Assets pools patterns resolvers
    var
        AssetsPoolPatternPathResolver = require('./lib/AssetsPoolPatternPathResolver'),
        AssetsPoolPatternGlobResolver = require('./lib/AssetsPoolPatternGlobResolver');

    assets
        .pools
            .addPatternResolver(new AssetsPoolPatternPathResolver(assets.path))
            .addPatternResolver(new AssetsPoolPatternGlobResolver(assets.path));

    // Assets components pools patterns Resolvers
    var
        AssetsComponentsPoolPatternPathResolver = require('./lib/AssetsComponentsPoolPatternPathResolver'),
        AssetsComponentsPoolPatternPoolsResolver = require('./lib/AssetsComponentsPoolPatternPoolsResolver');

    assets
        .componentsPools
            .addPatternResolver(new AssetsComponentsPoolPatternPathResolver(assets.path))
            .addPatternResolver(new AssetsComponentsPoolPatternPoolsResolver());


    // Gulp Tasks
    require('./tasks/pools')(assets, gulp);
    require('./tasks/components-pools')(assets, gulp);

    return assets;
};
