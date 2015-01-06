'use strict';


module.exports = function(assets, gulp)
{
    // Gulp Task
    gulp.task('clean', function(callback)
    {
        var
            gutil = require('gulp-util'),
            path = assets.fileSystem.getDestPath();

        gutil.log('Delete', gutil.colors.magenta(path));

        assets.fileSystem.rimrafPath(path, callback);
    });
};
