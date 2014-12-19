'use strict';

var
    fs = require('fs'),
    AssetsPool = require('./AssetsPool');

/**
 * Assets Pool Pattern Path Resolver
 */
function AssetsPoolPatternPathResolver() {
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
AssetsPoolPatternPathResolver.prototype.resolve = function(pattern) {
    return fs.existsSync(pattern.path) ? [
        new AssetsPool(
            pattern.id,
            pattern.path,
            pattern.description ? pattern.description : null
        )
    ] : [];
};

module.exports = AssetsPoolPatternPathResolver;
