'use strict';


var
    Pool = require('./Pool');


/**
 * Bundle Pool
 */
function BundlePool(fileSystem, bundle, srcDir, destDir, glob)
{
    this._fileSystem = fileSystem;

    this._bundle = bundle;
    this._srcDir = srcDir;
    this._destDir = destDir;
    this._glob = glob;
}


BundlePool.prototype = Object.create(Pool.prototype);


/**
 * Get Name
 */
BundlePool.prototype.getName = function()
{
    return this._bundle.getId();
};

/**
 * Get Path
 */
BundlePool.prototype.getPath = function()
{
    return this._bundle.getDirPath(
        this._srcDir
    );
};

/**
 * Get Src
 */
BundlePool.prototype.getSrc = function()
{
    return this._fileSystem.join(
        this.getPath(),
        this._glob
    );
};

/**
 * Get Dest
 */
Pool.prototype.getDest = function()
{
    return this._fileSystem.getDestDirPath(
        this._destDir
    );
};


module.exports = BundlePool;
