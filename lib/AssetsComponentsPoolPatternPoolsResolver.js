'use strict';


var
    fs = require('fs'),
    path = require('path'),
    AssetsComponentsPool = require('./AssetsComponentsPool');


/**
 * Assets Components Pool Pattern Pools Resolver
 */
function AssetsComponentsPoolPatternPoolsResolver(pools) {
    this.pools = pools;
}


/**
 * Match a pattern
 */
AssetsComponentsPoolPatternPoolsResolver.prototype.match = function(pattern) {
    return 'dir' in pattern;
};

/**
 * Resolve a pattern into an array of pools
 */
AssetsComponentsPoolPatternPoolsResolver.prototype.resolve = function(id, pattern) {

    var
        pools = {};

    this.pools.forEach(function(pool, poolId) {

        var
            componentsPath = path.join(pool.path, pattern.dir);

        if (fs.existsSync(componentsPath)) {
            pools[poolId] = new AssetsComponentsPool(
                componentsPath,
                pool.description
            );
        }
    });

    return pools;
};


module.exports = AssetsComponentsPoolPatternPoolsResolver;
