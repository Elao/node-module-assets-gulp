'use strict';

module.exports = function(gulp) {

    var
        assets = require('..')(gulp);

    // Assets pool pattern
    assets
        .addPoolPattern({
            name: 'assets',
            path: 'assets',
            description: 'Common assets'}
        );

    return assets;
};
