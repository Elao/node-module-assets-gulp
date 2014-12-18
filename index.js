'use strict';

// Assets
var
    Assets = require('./lib/Assets'),
    assets = new Assets();

module.exports = assets;

// Gulp
var
    gulp = require('gulp'),
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
