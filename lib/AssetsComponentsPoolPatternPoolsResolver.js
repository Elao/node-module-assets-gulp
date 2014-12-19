'use strict';


var
    fs = require('fs'),
    path = require('path'),
    AssetsComponentsPool = require('./AssetsComponentsPool');


/**
 * Assets Components Pool Pattern Pools Resolver
 */
function AssetsComponentsPoolPatternPoolsResolver() {
}


/**
 * Match a pattern
 */
AssetsComponentsPoolPatternPoolsResolver.prototype.match = function(pattern) {
    return ('pools' in pattern) && ('dir' in pattern);
};

/**
 * Resolve a pattern into an array of pools
 */
AssetsComponentsPoolPatternPoolsResolver.prototype.resolve = function(pattern) {
    var
        pools = [];

    pattern.pools.find().forEach(function(pool) {
        var
            componentsPath = path.join(pool.path, pattern.dir);

        if (fs.existsSync(componentsPath)) {
            pools.push(
                new AssetsComponentsPool(
                    pool.id,
                    componentsPath,
                    pool.description
                )
            );
        }
    });

    return pools;
};


module.exports = AssetsComponentsPoolPatternPoolsResolver;
