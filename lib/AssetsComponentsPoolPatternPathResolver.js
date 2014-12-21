'use strict';

/**
 * Assets Components Pool Pattern Path Resolver
 */
function AssetsComponentsPoolPatternPathResolver(path) {
    // Path
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
        fs = require('fs'),
        path = require('path'),
        AssetsComponentsPool = require('./AssetsComponentsPool'),
        poolPath = path.join(this.path, pattern.path);

    return fs.existsSync(poolPath) ? [
        new AssetsComponentsPool(
            id,
            poolPath,
            pattern.description
        )
    ] : [];
};


module.exports = AssetsComponentsPoolPatternPathResolver;
