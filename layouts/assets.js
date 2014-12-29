'use strict';

module.exports = function(gulp, options)
{
    var
        assets = require('./')(gulp, options);

    // Bundle patterns
    assets
        .addBundlePattern('assets', {
            path:        'assets',
            description: 'Common assets'
        });

    return assets;
};
