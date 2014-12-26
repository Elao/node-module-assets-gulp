'use strict';


var
    glob = require('glob'),
    path = require('path'),
    AssetsPool = require('./AssetsPool');


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
AssetsPoolPatternGlobResolver.prototype.resolve = function(id, pattern) {
    var
        pools = [];

    glob.sync(path.join(this.path, pattern.glob)).forEach(function(path) {
        pools.push(new AssetsPool(
            id(path),
            path,
            pattern.description
        ));
    });

    return pools;
};


module.exports = AssetsPoolPatternGlobResolver;
