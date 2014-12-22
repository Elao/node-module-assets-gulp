'use strict';

module.exports = function(assets, gulp) {

    var
        gutil = require('gulp-util');

    gulp.task('list-libraries', function(callback) {

        gutil.log(gutil.colors.cyan(assets.libraries.count()), 'libraries have been resolved');

        assets.libraries.forEach(function(library, libraryId) {
            gutil.log('-', libraryId, gutil.colors.magenta(library.path));
            if (library.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(library.description));
            }
        });

        callback();
    });
};
