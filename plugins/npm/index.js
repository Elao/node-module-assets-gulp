'use strict';


module.exports = function(assets)
{
    // Library patterns
    assets
        .addLibraryPattern({
            path:        'node_modules',
            description: 'Node modules'
        });
};
