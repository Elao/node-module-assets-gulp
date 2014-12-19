'use strict';

module.exports = function(gulp) {

    var
        assets = require('./base')(gulp);

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
