'use strict';

module.exports = function(gulp, path) {

    var
        assets = require('./')(gulp, path);

    // Pool patterns
    assets
        .addPoolPattern('assets', {
            path:        'assets',
            description: 'Common assets'
        });

    return assets;
};
