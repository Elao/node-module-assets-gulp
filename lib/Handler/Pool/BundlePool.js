'use strict';


var
    Pool = require('./Pool');


/**
 * Bundle Pool
 */
function BundlePool(bundle, dir, glob, fileSystem)
{
    this._bundle = bundle;
    this._dir = dir;
    this._glob = glob;
    this._fileSystem = fileSystem;
}


BundlePool.prototype = Object.create(Pool.prototype);


/**
 * Get Path
 */
BundlePool.prototype.getPath = function()
{
    return this._bundle.getDirPath(this._dir);
};

/**
 * Get Path Glob
 */
BundlePool.prototype.getPathGlob = function()
{
    return this._fileSystem.joinPathGlob(
        this.getPath(),
        this._glob
    );
};


module.exports = BundlePool;
