'use strict';


var
    fs = require('fs'),
    path = require('path'),
    AssetsLibrary = require('./AssetsLibrary');


/**
 * Assets Library Pattern Path Resolver
 */
function AssetsLibraryPatternPathResolver(path) {
    this.path = typeof(path) !== 'undefined' ? path : '';
}


/**
 * Match a pattern
 */
AssetsLibraryPatternPathResolver.prototype.match = function(pattern) {
    return 'path' in pattern;
};

/**
 * Resolve a pattern into an array of libraries
 */
AssetsLibraryPatternPathResolver.prototype.resolve = function(id, pattern) {

    var
        libraryPath = path.join(this.path, pattern.path),
        libraries = {};

    if (fs.existsSync(libraryPath)) {
        libraries[id] = new AssetsLibrary(
            libraryPath,
            pattern.description
        );
    }

    return libraries;
};


module.exports = AssetsLibraryPatternPathResolver;
