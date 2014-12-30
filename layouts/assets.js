'use strict';

module.exports = function(gulp, options)
{
    var
        assets = require('./')(gulp, options),
        bundleDir = assets.options.get('bundle_dir');

    // Bundle patterns
    assets
        .addBundlePattern('assets', {
            path:        bundleDir,
            description: 'Common assets'
        });

    return assets;
};
