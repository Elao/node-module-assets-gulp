'use strict';

module.exports = function(gulp, path)
{
    var
        assets = require('./')(gulp, path);

    // Bundle patterns
    assets
        .addBundlePattern('assets', {
            path:        'assets',
            description: 'Common assets'
        });

    return assets;
};
