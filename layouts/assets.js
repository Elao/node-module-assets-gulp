'use strict';

module.exports = function(gulp, path) {

    var
        assets = require('./base')(gulp, path);

    // Assets pools pattern
    assets
        .pools
            .addPattern({
                id:          'assets',
                path:        'assets',
                description: 'Common assets'
            });

    return assets;
};