'use strict';


module.exports = function(assets, options)
{
    // Options
    options = require('defaults')(options || {}, {
        path: 'assets'
    });

    // Bundle Patterns
    assets
        .addBundlePattern('assets', {
            path:        options.path,
            description: 'Common assets'
        });
};
