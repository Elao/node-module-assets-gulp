'use strict';


var
    fs = require('fs'),
    path = require('path'),
    AssetsLibrary = require('./AssetsLibrary');


/**
 * Assets Library Pattern Pools Resolver
 */
function AssetsLibraryPatternPoolsResolver(pools) {
    this.pools = pools;
}


/**
 * Match a pattern
 */
AssetsLibraryPatternPoolsResolver.prototype.match = function(pattern) {
    return 'dir' in pattern;
};

/**
 * Resolve a pattern into an array of libraries
 */
AssetsLibraryPatternPoolsResolver.prototype.resolve = function(id, pattern) {

    var
        libraries = {};

    this.pools.forEach(function(pool, poolId) {

        var
            libraryPath = path.join(pool.path, pattern.dir);

        if (fs.existsSync(libraryPath)) {
            libraries[poolId] = new AssetsLibrary(
                libraryPath,
                pool.description
            );
        }
    });

    return libraries;
};


module.exports = AssetsLibraryPatternPoolsResolver;
