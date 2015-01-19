'use strict';


module.exports = function(assets, options)
{
    // Options
    options = typeof(options) !== 'undefined' ? options : {};
    options = {
        path: typeof(options.path) !== 'undefined' ? options.path : 'assets'
    };

    // Bundle Patterns
    assets
        .addBundlePattern('assets', {
            path:        options.path,
            description: 'Common assets'
        });
};
