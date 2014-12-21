'use strict';


var
    fs = require('fs'),
    path = require('path'),
    AssetsComponentsPool = require('./AssetsComponentsPool');


/**
 * Assets Components Pool Pattern Path Resolver
 */
function AssetsComponentsPoolPatternPathResolver(path) {
    this.path = typeof(path) !== 'undefined' ? path : '';
}


/**
 * Match a pattern
 */
AssetsComponentsPoolPatternPathResolver.prototype.match = function(pattern) {
    return 'path' in pattern;
};

/**
 * Resolve a pattern into an array of pools
 */
AssetsComponentsPoolPatternPathResolver.prototype.resolve = function(id, pattern) {

    var
        poolPath = path.join(this.path, pattern.path),
        pools = {};

    if (fs.existsSync(poolPath)) {
        pools[id] = new AssetsComponentsPool(
            poolPath,
            pattern.description
        );
    }

    return pools;
};


module.exports = AssetsComponentsPoolPatternPathResolver;
