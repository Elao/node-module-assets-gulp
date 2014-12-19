'use strict';

var
    fs = require('fs'),
    AssetsComponentsPool = require('./AssetsComponentsPool');

/**
 * Assets Components Pool Pattern Path Resolver
 */
function AssetsComponentsPoolPatternPathResolver() {
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
AssetsComponentsPoolPatternPathResolver.prototype.resolve = function(pattern) {
    return fs.existsSync(pattern.path) ? [
        new AssetsComponentsPool(
            pattern.id,
            pattern.path,
            pattern.description ? pattern.description : null
        )
    ] : [];
};

module.exports = AssetsComponentsPoolPatternPathResolver;
