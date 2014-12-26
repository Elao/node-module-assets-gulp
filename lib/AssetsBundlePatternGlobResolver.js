'use strict';


var
    glob = require('glob'),
    path = require('path'),
    AssetsBundle = require('./AssetsBundle');


/**
 * Assets Bundle Pattern Glob Resolver
 */
function AssetsBundlePatternGlobResolver(path)
{
    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';
}


/**
 * Match a pattern
 */
AssetsBundlePatternGlobResolver.prototype.match = function(pattern)
{
    return 'glob' in pattern;
};

/**
 * Resolve a pattern into an array of bundles
 */
AssetsBundlePatternGlobResolver.prototype.resolve = function(id, pattern)
{
    var
        bundles = [];

    glob.sync(path.join(this.path, pattern.glob)).forEach(function(path) {
        bundles.push(new AssetsBundle(
            id(path),
            path,
            pattern.description
        ));
    });

    return bundles;
};


module.exports = AssetsBundlePatternGlobResolver;
