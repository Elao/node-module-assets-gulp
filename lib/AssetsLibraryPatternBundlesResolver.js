'use strict';


var
    fs = require('fs'),
    path = require('path'),
    AssetsLibrary = require('./AssetsLibrary');


/**
 * Assets Library Pattern Bundles Resolver
 */
function AssetsLibraryPatternBundlesResolver(bundles)
{
    this.bundles = bundles;
}


/**
 * Match a pattern
 */
AssetsLibraryPatternBundlesResolver.prototype.match = function(pattern)
{
    return 'dir' in pattern;
};

/**
 * Resolve a pattern into an array of libraries
 */
AssetsLibraryPatternBundlesResolver.prototype.resolve = function(pattern)
{
    var
        libraries = [];

    this.bundles.forEach(function(bundle) {

        var
            libraryPath = path.join(bundle.path, pattern.dir);

        if (fs.existsSync(libraryPath)) {
            libraries.push(new AssetsLibrary(
                libraryPath,
                bundle.description
            ));
        }
    });

    return libraries;
};


module.exports = AssetsLibraryPatternBundlesResolver;
