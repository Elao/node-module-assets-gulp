'use strict';

module.exports = function(assets, gulp) {

    var
        gutil = require('gulp-util');

    gulp.task('list-pools', function(callback) {

        gutil.log(gutil.colors.cyan(assets.pools.count()), 'pools have been resolved');

        assets.pools.forEach(function(pool, poolId) {
            gutil.log('-', poolId, gutil.colors.magenta(pool.path));
            if (pool.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(pool.description));
            }
        });

        callback();
    });
};
