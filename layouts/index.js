'use strict';

module.exports = function(gulp, options)
{
    var
        assets = require('..')(gulp, options),
        libraryDir = assets.options.get('library_dir');

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
            dir: libraryDir
        });

    return assets;
};
