'use strict';


var
    fs = require('fs'),
    path = require('path'),
    AssetsBundle = require('./AssetsBundle');


/**
 * Assets Bundle Pattern Path Resolver
 */
function AssetsBundlePatternPathResolver(path)
{
    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';
}


/**
 * Match a pattern
 */
AssetsBundlePatternPathResolver.prototype.match = function(pattern)
{
    return 'path' in pattern;
};

/**
 * Resolve a pattern into an array of bundles
 */
AssetsBundlePatternPathResolver.prototype.resolve = function(id, pattern)
{

    var
        bundlePath = path.join(this.path, pattern.path),
        bundles = [];

    if (fs.existsSync(bundlePath)) {
        bundles.push(new AssetsBundle(
            id,
            bundlePath,
            pattern.description
        ));
    }

    return bundles;
};


module.exports = AssetsBundlePatternPathResolver;
