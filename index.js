'use strict';

module.exports = function(gulp) {

    // Assets
    var
        Assets = require('./lib/Assets'),
        assets = new Assets();

    // Gulp
    var
        util = require('gulp-util');

    // Gulp - Pools
    gulp.task('pools', function(callback) {
        var
            pools = assets.getPools();

        util.log(
            'Found',
            util.colors.cyan(pools.length),
            'pools'
        );
        
        console.log(pools);
    });

    return assets;
};
