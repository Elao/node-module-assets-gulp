'use strict';


module.exports = function(assets)
{
    return {
        // Task
        task: function(callback) {
            var
                gulpUtil = require('gulp-util'),
                path = assets.fileSystem.getDestPath();

            gulpUtil.log('Delete', gulpUtil.colors.magenta(path));

            assets.fileSystem.rimrafPath(path, callback);
        }
    };
};
