'use strict';


/**
 * Assets Bundle Collection
 */
function AssetsBundleCollection()
{
    this.bundles = [];
    this.patterns = [];
    this.patternResolvers = [];

    this.patternsResolved = false;
}


/**
 * Add pattern resolver
 */
AssetsBundleCollection.prototype.addPatternResolver = function(patternResolver)
{
    this.patternResolvers.push(patternResolver);

    return this;
};

/**
 * Add pattern
 */
AssetsBundleCollection.prototype.addPattern = function(id, pattern)
{
    this.patterns.push({id: id, pattern: pattern});

    return this;
};

/**
 * All
 */
AssetsBundleCollection.prototype.all = function()
{
    if (!this.patternsResolved) {
        this.patterns.forEach(function(pattern) {
            this.patternResolvers.forEach(function(patternResolver) {
                if (patternResolver.match(pattern.pattern)) {
                    this.bundles = this.bundles.concat(patternResolver.resolve(pattern.id, pattern.pattern));
                }
            }.bind(this));
        }.bind(this));

        this.patternsResolved = true;
    }

    return this.bundles;
};

/**
 * Count
 */
AssetsBundleCollection.prototype.count = function()
{
    return this.all().length;
};

/**
 * For each
 */
AssetsBundleCollection.prototype.forEach = function(callback)
{
    this.all().forEach(function(bundle) {
        callback(bundle);
    });
};

/**
 * Find paths
 */
AssetsBundleCollection.prototype.paths = function()
{
    var
        paths = [];

    this.forEach(function(bundle) {
        paths.push(bundle.path);
    });

    return paths;
};


module.exports = AssetsBundleCollection;
