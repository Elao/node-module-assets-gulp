'use strict';

module.exports = function(gulp, path) {

    var
        assets = require('..')(gulp, path);

    // Base components pools patterns
    assets
        .componentsPools
            .addPattern('bower', {
                path:        'bower_components',
                description: 'Bower components'
            })
            .addPattern('node', {
                path:        'node_modules',
                description: 'Node modules'
            })
            .addPattern(
                function(id) {
                    return id + 'Components';
                },
                {
                    dir: 'components'
                }
            );

    return assets;
};
