'use strict';

module.exports = function(gulp, path) {

    var
        assets = require('./')(gulp, path);

    // Assets pools pattern
    assets
        .pools
            .addPattern('assets', {
                path:        'assets',
                description: 'Common assets'
            });

    return assets;
};
