'use strict';


var
    Handler = require('../../lib/Handler/Handler');


module.exports = function(assets, gulp)
{
	// Handler
    assets
        .addHandler(new Handler('images', 'Handles images assets'));

    // Images
    gulp.task('images', function(callback) {
        callback();
    });

};
