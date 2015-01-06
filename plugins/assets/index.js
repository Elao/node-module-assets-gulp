'use strict';


module.exports = function(assets, options)
{
    // Options
    options = typeof(options) !== 'undefined' ? options : {};
    options = {
        dir: typeof(options.dir) !== 'undefined' ? options.dir : 'assets'
    };

    // Bundle Patterns
    assets
        .addBundlePattern('assets', {
            path:        options.dir,
            description: 'Common assets'
        });
};
