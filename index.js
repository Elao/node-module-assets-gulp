'use strict';

module.exports = function(gulp) {

    // Check gulp injection
    if ((typeof gulp !== 'object') || (gulp.constructor.name !== 'Gulp')) {
        console.error('Error: You must pass a gulp instance as first parameter !');
        process.exit(1);
    }

    // Assets
    var
        Assets = require('./lib/Assets'),
        assets = new Assets();

    // Assets Pool Pattern Resolvers
    var
        AssetsPoolPatternPathResolver = require('./lib/AssetsPoolPatternPathResolver'),
        AssetsPoolPatternGlobResolver = require('./lib/AssetsPoolPatternGlobResolver');

    assets
        .addPoolPatternResolver(new AssetsPoolPatternPathResolver())
        .addPoolPatternResolver(new AssetsPoolPatternGlobResolver());

    // Assets components pools patterns Resolvers
    var
        AssetsComponentsPoolPatternPathResolver = require('./lib/AssetsComponentsPoolPatternPathResolver');

    assets
        .componentsPools
            .addPatternResolver(new AssetsComponentsPoolPatternPathResolver());

    // Gulp
    var
        gutil = require('gulp-util');

    // Task - Pools
    gulp.task('pools', function(callback) {
        var
            pools = assets.findPools();

        gutil.log('Found', gutil.colors.cyan(pools.length), 'pools');

        pools.forEach(function(pool) {
            gutil.log('-', pool.getName(), gutil.colors.magenta(pool.getPath()));
            if (pool.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(pool.getDescription()));
            }
        });

        callback();
    });

    // Task - Components Pools
    gulp.task('components-pools', function(callback) {
        var
            pools = assets.componentsPools.find();

        gutil.log('Found', gutil.colors.cyan(pools.length), 'components pools');

        pools.forEach(function(pool) {
            gutil.log('-', pool.getId(), gutil.colors.magenta(pool.getPath()));
            if (pool.hasDescription()) {
                gutil.log(' ', gutil.colors.cyan(pool.getDescription()));
            }
        });

        callback();
    });

    return assets;
};
