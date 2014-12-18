'use strict';

var
    glob = require('glob'),
    AssetsPool = require('./AssetsPool');

/**
 * Assets Pool Pattern Glob Resolver
 */
function AssetsPoolPatternGlobResolver() {
}

/**
 * Match a pool pattern
 */
AssetsPoolPatternGlobResolver.prototype.match = function(poolPattern) {
    return 'glob' in poolPattern;
};

/**
 * Resolve a pool pattern into an array of pools
 */
AssetsPoolPatternGlobResolver.prototype.resolve = function(poolPattern) {
    var
        pools = [];

    glob.sync(poolPattern.glob).forEach(function(path) {
        pools.push(
            new AssetsPool(
                poolPattern.name(path),
                path,
                poolPattern.description
            )
        );
    });

    return pools;
};

module.exports = AssetsPoolPatternGlobResolver;
