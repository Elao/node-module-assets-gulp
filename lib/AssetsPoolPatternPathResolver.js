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
 * Match a pool pattern
 */
AssetsPoolPatternPathResolver.prototype.match = function(poolPattern) {
    return 'path' in poolPattern;
};

/**
 * Resolve a pool pattern into an array of pools
 */
AssetsPoolPatternPathResolver.prototype.resolve = function(poolPattern) {
    return fs.existsSync(poolPattern.path) ? [
        new AssetsPool(
            poolPattern.name,
            poolPattern.path,
            poolPattern.description ? poolPattern.description : null
        )
    ] : [];
};

module.exports = AssetsPoolPatternPathResolver;
