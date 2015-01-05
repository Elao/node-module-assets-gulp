'use strict';


var
    AssetsOptions = require('./AssetsOptions'),
    AssetsFileSystem = require('./AssetsFileSystem'),
    BundleCollection = require('./Bundle/BundleCollection'),
    LibraryCollection = require('./Library/LibraryCollection'),
    PoolHandlerCollection = require('./Pool/Handler/HandlerCollection');


/**
 * Assets
 */
function Assets(options)
{
    // Options
    this.options = new AssetsOptions(options);

    // File System
    this.fileSystem = new AssetsFileSystem(this.options);

    // Bundles
    this.bundles = new BundleCollection();

    // Libraries
    this.libraries = new LibraryCollection();

    // Pool Handlers
    this.poolHandlers = new PoolHandlerCollection();
}


/**
 * Add bundle pattern solver
 */
Assets.prototype.addBundlePatternSolver = function(solver)
{
    this.bundles
        .addPatternSolver(solver);

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
 * Add library pattern solver
 */
Assets.prototype.addLibraryPatternSolver = function(solver)
{
    this.libraries
        .addPatternSolver(solver);

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
 * Add pool handler
 */
Assets.prototype.addPoolHandler = function(handler)
{
    return this.poolHandlers.add(handler);
};

/**
 * Get pool handler
 */
Assets.prototype.getPoolHandler = function(handlerId)
{
    return this.poolHandlers.get(handlerId);
};


module.exports = Assets;
