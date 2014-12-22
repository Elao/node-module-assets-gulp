'use strict';

module.exports = function(assets, gulp) {

    var
        gutil = require('gulp-util');

    gulp.task('list-handlers', function(callback) {

        gutil.log(gutil.colors.cyan(assets.handlers.count()), 'handlers have been added');

        assets.handlers.forEach(function(handler, handlerId) {
            gutil.log('-', handlerId);
        });

        callback();
    });
};
