'use strict';


module.exports = function(assets, gulp)
{
    // Task
    gulp.task('clean', function(callback)
    {
        var
            gutil = require('gulp-util'),
            //path = require('path'),
            //fs = require('fs'),
            //rimraf = require('rimraf'),
            path = assets.fileSystem.getDestPath();

        gutil.log('Delete', gutil.colors.magenta(path));

        assets.fileSystem.rimrafPath(path, callback);
    });
};
