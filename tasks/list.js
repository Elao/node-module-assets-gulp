'use strict';

module.exports = function(assets, gulp)
{
    var
        gutil = require('gulp-util');

    // List
    gulp.task('list', ['list:bundles', 'list:libraries', 'list:handlers']);

    // List - Bundles
    gulp.task('list:bundles', function(callback)
    {
        gutil.log(gutil.colors.cyan(assets.bundles.count()), 'bundles have been resolved');

        assets.bundles.forEach(function(bundle) {
            gutil.log('-', bundle.id, gutil.colors.magenta(bundle.path));
            if (bundle.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(bundle.description));
            }
        });

        callback();
    });

    // List - Libraries
    gulp.task('list:libraries', function(callback)
    {
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
    gulp.task('list:handlers', function(callback)
    {
        gutil.log(gutil.colors.cyan(assets.handlers.count()), 'handlers have been added');

        assets.handlers.forEach(function(handler) {
            gutil.log('-', handler.id);
            if (handler.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(handler.description));
            }
        });

        callback();
    });
};
