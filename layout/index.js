'use strict';

module.exports = function(gulp, path) {

    var
        assets = require('..')(gulp, path);

    // Library patterns
    assets
        .addLibraryPattern('bower', {
            path:        'bower_components',
            description: 'Bower components'
        })
        .addLibraryPattern('node', {
            path:        'node_modules',
            description: 'Node modules'
        })
        .addLibraryPattern({
            dir: 'components'
        });

    return assets;
};
