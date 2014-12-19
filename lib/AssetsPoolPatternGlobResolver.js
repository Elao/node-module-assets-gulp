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
 * Match a pattern
 */
AssetsPoolPatternGlobResolver.prototype.match = function(pattern) {
    return 'glob' in pattern;
};

/**
 * Resolve a pattern into an array of pools
 */
AssetsPoolPatternGlobResolver.prototype.resolve = function(pattern) {
    var
        pools = [];

    glob.sync(pattern.glob).forEach(function(path) {
        pools.push(
            new AssetsPool(
                pattern.id(path),
                path,
                pattern.description
            )
        );
    });

    return pools;
};

module.exports = AssetsPoolPatternGlobResolver;
