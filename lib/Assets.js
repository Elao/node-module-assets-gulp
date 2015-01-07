'use strict';


var
    AssetsOptions = require('./AssetsOptions'),
    AssetsFileSystem = require('./AssetsFileSystem'),
    BundleCollection = require('./Bundle/BundleCollection'),
    LibraryCollection = require('./Library/LibraryCollection');


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
    this.poolHandlers = [];
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
    return this.poolHandlers.push(handler);
};

/**
 * Get pool handler
 */
Assets.prototype.getPoolHandler = function(id)
{
    var
        handlerReturn;

    this.poolHandlers.some(function(handler) {
        if (handler.getId() === id) {
            handlerReturn = handler;
            return true;
        }
    });

    if (typeof(handlerReturn) === 'undefined') {
        throw new Error('Could not find handler with id "' + id + '"');
    }

    return handlerReturn;
};


module.exports = Assets;
