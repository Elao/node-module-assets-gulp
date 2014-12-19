'use strict';

module.exports = function(assets, gulp) {

    var
        gutil = require('gulp-util');

    gulp.task('pools', function(callback) {
        var
            pools = assets.pools.find();

        gutil.log('Found', gutil.colors.cyan(pools.length), 'pools');

        pools.forEach(function(pool) {
            gutil.log('-', pool.id, gutil.colors.magenta(pool.path));
            if (pool.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(pool.description));
            }
        });

        callback();
    });
};
