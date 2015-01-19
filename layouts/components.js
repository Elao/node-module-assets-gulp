'use strict';


module.exports = function(assets, options)
{
	// Options
    options = typeof(options) !== 'undefined' ? options : {};
    options = {
        dir: typeof(options.dir) !== 'undefined' ? options.dir : 'components'
    };

    // Library Patterns
    assets
        .addLibraryPattern({
            dir: options.dir
        });
};
