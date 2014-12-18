'use strict';

module.exports = function(gulp) {

    // Check gulp injection
    if ((typeof gulp !== 'object') || (gulp.constructor.name !== 'Gulp')) {
        console.error('Error: You must pass a gulp instance as first parameter !');
        process.exit(1);
    }

    // Assets
    var
        Assets     = require('./lib/Assets'),
        AssetsPool = require('./lib/AssetsPool'),
        assets     = new Assets();

    assets
        .addPool(new AssetsPool('test_a', 'test/test/a', 'Teeeeest AAA'))
        .addPool(new AssetsPool('test_b', 'test/test/b'))
        .addPool(new AssetsPool('test_c', 'test/test/c', 'Teeeeest CCC'));

    // Gulp
    var
        gutil = require('gulp-util');

    // Task - Pools
    gulp.task('pools', function(callback) {
        var
            pools = assets.getPools();

        gutil.log('Found', gutil.colors.cyan(pools.length), 'pools');

        pools.forEach(function(pool) {
            gutil.log('-', pool.getName(), gutil.colors.magenta(pool.getPath()));
            if (pool.hasComment()) {
                gutil.log(' ', gutil.colors.cyan(pool.getComment()));
            }
        });

        callback();
    });

    return assets;
};
