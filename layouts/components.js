'use strict';


module.exports = function(assets, options)
{
    // Options
    options = require('defaults')(options || {}, {
        dir: 'components'
    });

    // Library Patterns
    assets
        .addLibraryPattern({
            dir: options.dir
        });
};
