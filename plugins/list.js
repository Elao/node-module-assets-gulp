'use strict';


module.exports = function(assets)
{
    return {

        // List bundles
        bundles: function(callback) {
            var
                gulpUtil = require('gulp-util'),
                bundles  = assets.bundles.find();

            gulpUtil.log('Found', gulpUtil.colors.cyan(bundles.length), 'bundles');

            bundles.forEach(function(bundle) {
                gulpUtil.log('-', bundle.getId(), gulpUtil.colors.magenta(bundle.getPath()));
                if (bundle.hasDescription()) {
                    gulpUtil.log(' ', gulpUtil.colors.cyan(bundle.getDescription()));
                }
            });

            callback();
        },

        // List libraries
        libraries: function(callback) {
            var
                gulpUtil  = require('gulp-util'),
                libraries = assets.libraries.find();

            gulpUtil.log('Found', gulpUtil.colors.cyan(libraries.length), 'libraries');

            libraries.forEach(function(library) {
                gulpUtil.log('-', gulpUtil.colors.magenta(library.getPath()));
                if (library.hasDescription()) {
                    gulpUtil.log(' ', gulpUtil.colors.cyan(library.getDescription()));
                }
            });

            callback();
        },

        // List pools
        pools: function(callback) {
            var
                gulpUtil = require('gulp-util');

            gulpUtil.log('Added', gulpUtil.colors.cyan(assets.poolHandlers.length), 'pool handlers');

            // Pool Handlers
            assets.poolHandlers.forEach(function(poolHandler)
            {
                var
                    pools;

                gulpUtil.log('-', poolHandler.getId());
                if (poolHandler.hasDescription()) {
                    gulpUtil.log(' ', gulpUtil.colors.cyan(poolHandler.getDescription()));
                }

                // Pools
                pools = poolHandler.pools.find();
                gulpUtil.log('     Found', gulpUtil.colors.cyan(pools.length), 'pools');
                pools.forEach(function(pool) {
                    gulpUtil.log('     -', pool.getName());
                    gulpUtil.log('      ', gulpUtil.colors.cyan('src: '), gulpUtil.colors.magenta(pool.getSrc()));
                    gulpUtil.log('      ', gulpUtil.colors.cyan('dest:'), gulpUtil.colors.magenta(pool.getDest()));
                });
            });

            callback();
        }
    };
};
