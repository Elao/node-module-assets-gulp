'use strict';

module.exports = function(gulp, path) {

    var
        assets = require('..')(gulp, path);

    // Libraries patterns
    assets
        .libraries
            .addPattern('bower', {
                path:        'bower_components',
                description: 'Bower components'
            })
            .addPattern('node', {
                path:        'node_modules',
                description: 'Node modules'
            })
            .addPattern({
                dir: 'components'
            });

    return assets;
};
