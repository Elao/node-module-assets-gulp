'use strict';


var
    fs = require('fs'),
    path = require('path'),
    AssetsPool = require('./AssetsPool');


/**
 * Assets Pool Pattern Path Resolver
 */
function AssetsPoolPatternPathResolver(path) {
    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';
}


/**
 * Match a pattern
 */
AssetsPoolPatternPathResolver.prototype.match = function(pattern) {
    return 'path' in pattern;
};

/**
 * Resolve a pattern into an array of pools
 */
AssetsPoolPatternPathResolver.prototype.resolve = function(id, pattern) {

    var
        poolPath = path.join(this.path, pattern.path),
        pools = {};

    if (fs.existsSync(poolPath)) {
        pools[id] = new AssetsPool(
            poolPath,
            pattern.description
        );
    }

    return pools;
};


module.exports = AssetsPoolPatternPathResolver;
