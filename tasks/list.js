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
        gutil.log(gutil.colors.cyan(assets.bundles.count()), 'bundles have been solved');

        assets.bundles.forEach(function(bundle) {
            gutil.log('-', bundle.getId(), gutil.colors.magenta(bundle.getPath()));
            if (bundle.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(bundle.getDescription()));
            }
        });

        callback();
    });

    // List - Libraries
    gulp.task('list:libraries', function(callback)
    {
        gutil.log(gutil.colors.cyan(assets.libraries.count()), 'libraries have been solved');

        assets.libraries.forEach(function(library) {
            gutil.log('-', gutil.colors.magenta(library.getPath()));
            if (library.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(library.getDescription()));
            }
        });

        callback();
    });

    // List - Handlers
    gulp.task('list:handlers', function(callback)
    {
        gutil.log(gutil.colors.cyan(assets.handlers.count()), 'handlers have been added');

        assets.handlers.forEach(function(handler) {
            gutil.log('-', handler.getId());
            if (handler.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(handler.getDescription()));
            }
        });

        callback();
    });
};
