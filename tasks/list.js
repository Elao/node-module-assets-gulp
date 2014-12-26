'use strict';

module.exports = function(assets, gulp) {

    var
        gutil = require('gulp-util');

    // List
    gulp.task('list', ['list:pools', 'list:libraries', 'list:handlers']);

    // List - Pools
    gulp.task('list:pools', function(callback) {

        gutil.log(gutil.colors.cyan(assets.pools.count()), 'pools have been resolved');

        assets.pools.forEach(function(pool) {
            gutil.log('-', pool.id, gutil.colors.magenta(pool.path));
            if (pool.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(pool.description));
            }
        });

        callback();
    });

    // List - Libraries
    gulp.task('list:libraries', function(callback) {

        gutil.log(gutil.colors.cyan(assets.libraries.count()), 'libraries have been resolved');

        assets.libraries.forEach(function(library) {
            gutil.log('-', gutil.colors.magenta(library.path));
            if (library.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(library.description));
            }
        });

        callback();
    });

    // List - Handlers
    gulp.task('list:handlers', function(callback) {

        gutil.log(gutil.colors.cyan(assets.handlers.count()), 'handlers have been added');

        assets.handlers.forEach(function(handler, handlerId) {
            gutil.log('-', handlerId);
        });

        callback();
    });
};
