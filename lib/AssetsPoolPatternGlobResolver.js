'use strict';


/**
 * Assets Pool Pattern Glob Resolver
 */
function AssetsPoolPatternGlobResolver(path) {
    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';
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
        glob = require('glob'),
        path = require('path'),
        AssetsPool = require('./AssetsPool'),
        pools = [];

    glob.sync(path.join(this.path, pattern.glob)).forEach(function(path) {
        pools.push(
            new AssetsPool(
                pattern.id(path),
                path,
                typeof(pattern.description) !== 'undefined' ? pattern.description : null
            )
        );
    });

    return pools;
};


module.exports = AssetsPoolPatternGlobResolver;
