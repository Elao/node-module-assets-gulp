'use strict';

module.exports = function(gulp, options)
{
    var
        assets = require('./')(gulp, options),
        bundleDir = assets.options.get('bundleDir');

    // Bundle patterns
    assets
        .addBundlePattern('assets', {
            path:        bundleDir,
            description: 'Common assets'
        });

    return assets;
};
