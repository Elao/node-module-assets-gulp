'use strict';


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
AssetsPoolPatternPathResolver.prototype.resolve = function(pattern) {

    var
        fs = require('fs'),
        path = require('path'),
        AssetsPool = require('./AssetsPool');

    return fs.existsSync(path.join(this.path, pattern.path)) ? [
        new AssetsPool(
            pattern.id,
            pattern.path,
            typeof(pattern.description) !== 'undefined' ? pattern.description : null
        )
    ] : [];
};


module.exports = AssetsPoolPatternPathResolver;
