'use strict';


module.exports = function(assets, options)
{
    options = typeof(options) !== 'undefined' ? options : {};

    options = {
        dir: typeof(options.dir) !== 'undefined' ? options.dir : 'components'
    };

    // Library patterns
    assets
        .addLibraryPattern({
            dir: options.dir
        });
};
