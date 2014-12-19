'use strict';

module.exports = function(gulp, path) {

    var
        assets = require('..')(gulp, path);

    // Base components pools patterns
    assets
        .componentsPools
            .addPattern({
                id:          'bower',
                path:        'bower_components',
                description: 'Bower components'
            })
            .addPattern({
                id:          'node',
                path:        'node_modules',
                description: 'Node modules'
            })
            .addPattern({
                pools: assets.pools,
                dir: 'components'
            });

    return assets;
};
