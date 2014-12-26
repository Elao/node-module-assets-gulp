'use strict';

var
    AssetsHandler = require('../../lib/AssetsHandler');

module.exports = function(assets, gulp)
{
	// Handler
    assets
        .handlers
            .add(new AssetsHandler('images', 'Handles images assets'));

    // Images
    gulp.task('images', function(callback) {
        callback();
    });

};
