'use strict';

module.exports = function(assets, gulp) {

    var
        gutil = require('gulp-util');

    gulp.task('libraries', function(callback) {

        gutil.log('Found', gutil.colors.cyan(assets.libraries.count()), 'libraries');

        assets.libraries.forEach(function(pool, poolId) {
            gutil.log('-', poolId, gutil.colors.magenta(pool.path));
            if (pool.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(pool.description));
            }
        });

        callback();
    });
};
