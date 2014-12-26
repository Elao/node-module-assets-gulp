'use strict';


var
    AssetsBundleCollection = require('./AssetsBundleCollection'),
    AssetsLibraryCollection = require('./AssetsLibraryCollection'),
    AssetsHandlerCollection = require('./AssetsHandlerCollection');


/**
 * Assets
 */
function Assets(path)
{
    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';

    // Bundles
    this.bundles = new AssetsBundleCollection();

    // Libraries
    this.libraries = new AssetsLibraryCollection();

    // Handlers
    this.handlers = new AssetsHandlerCollection();
}


/**
 * Add bundle pattern resolver
 */
Assets.prototype.addBundlePatternResolver = function(resolver)
{
    this.bundles
        .addPatternResolver(resolver);

    return this;
};

/**
 * Add bundle pattern
 */
Assets.prototype.addBundlePattern = function(id, pattern)
{
    this.bundles
        .addPattern(id, pattern);

    return this;
};

/**
 * Add library pattern resolver
 */
Assets.prototype.addLibraryPatternResolver = function(resolver)
{
    this.libraries
        .addPatternResolver(resolver);

    return this;
};

/**
 * Add library pattern
 */
Assets.prototype.addLibraryPattern = function(pattern)
{
    this.libraries
        .addPattern(pattern);

    return this;
};

/**
 * Get handler
 */
Assets.prototype.get = function(handlerId)
{
    return this.handlers.get(handlerId);
};


module.exports = Assets;
