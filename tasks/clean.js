'use strict';

module.exports = function(assets, gulp)
{
    // Clean
    gulp.task('clean', function(callback)
    {
        var
            gutil = require('gulp-util'),
            path = require('path'),
            fs = require('fs'),
            rimraf = require('rimraf'),
            dir = assets.fileSystem.normalizePath(
                assets.options.get('dest')
            );

        gutil.log('Delete', gutil.colors.magenta(dir));

        // Use custom delete method instead of dedicated module such as "del"
        // to lighten dependencies
        // See: https://github.com/isaacs/rimraf/issues/36#issuecomment-39755124

        fs.readdir(dir, function(error, files)
        {
            var
                n = 0,
                errorState = null;

            if (error) {
                return callback(
                    error.code === 'ENOENT' ? null : error
                );
            }

            if (files.length === 0) {
                return process.nextTick(callback);
            }

            files.forEach(function(file) {
                if (file === '.' || file === '..') {
                    return process.nextTick(next);
                }
                rimraf(path.join(dir, file), next);
            });

            function next(error) {
                if (errorState) {
                    return;
                } else if (error) {
                    return callback(errorState = error);
                } else if (--n === 0) {
                    return callback();
                }
            }
        });
    });
};
