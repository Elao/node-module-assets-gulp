'use strict';


var
    AssetsPoolCollection = require('./AssetsPoolCollection'),
    AssetsLibraryCollection = require('./AssetsLibraryCollection'),
    AssetsHandlerCollection = require('./AssetsHandlerCollection');


/**
 * Assets
 */
function Assets(path) {

    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';

    // Pools
    this.pools = new AssetsPoolCollection();

    // Libraries
    this.libraries = new AssetsLibraryCollection();

    // Handlers
    this.handlers = new AssetsHandlerCollection();
}

/**
 * Add pool pattern resolver
 */
Assets.prototype.addPoolPatternResolver = function(resolver) {
    this.pools
        .addPatternResolver(resolver);

    return this;
};

/**
 * Add pool pattern
 */
Assets.prototype.addPoolPattern = function(id, pattern) {
    this.pools
        .addPattern(id, pattern);

    return this;
};

/**
 * Add library pattern resolver
 */
Assets.prototype.addLibraryPatternResolver = function(resolver) {
    this.libraries
        .addPatternResolver(resolver);

    return this;
};

/**
 * Add library pattern
 */
Assets.prototype.addLibraryPattern = function(pattern) {
    this.libraries
        .addPattern(pattern);

    return this;
};

/**
 * Get handler
 */
Assets.prototype.get = function(handlerId) {
    return this.handlers.get(handlerId);
};


module.exports = Assets;
