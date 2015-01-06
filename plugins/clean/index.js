'use strict';


module.exports = function(assets, gulp)
{
    // Gulp Task
    gulp.task('clean', function(callback)
    {
        var
            gulpUtil = require('gulp-util'),
            path = assets.fileSystem.getDestPath();

        gulpUtil.log('Delete', gulpUtil.colors.magenta(path));

        assets.fileSystem.rimrafPath(path, callback);
    });
};
