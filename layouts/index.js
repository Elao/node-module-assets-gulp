'use strict';

module.exports = function(gulp, options)
{
    var
        assets = require('..')(gulp, options);

    // Library patterns
    assets
        .addLibraryPattern({
            path:        'bower_components',
            description: 'Bower components'
        })
        .addLibraryPattern({
            path:        'node_modules',
            description: 'Node modules'
        })
        .addLibraryPattern({
            dir: 'components'
        });

    return assets;
};
