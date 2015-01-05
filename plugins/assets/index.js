'use strict';


module.exports = function(assets, options)
{
    options = typeof(options) !== 'undefined' ? options : {};

    options = {
        dir: typeof(options.dir) !== 'undefined' ? options.dir : 'assets'
    };

    // Bundle patterns
    assets
        .addBundlePattern('assets', {
            path:        options.dir,
            description: 'Common assets'
        });
};
