'use strict';


var
    Pool = require('./Pool');


/**
 * Bundle Pool
 */
function BundlePool(handler, bundle, srcDir, glob)
{
    this._bundle = bundle;
    this._srcDir = srcDir;
    this._glob = glob;

    Pool.call(this, handler);
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
 * Get Src
 */
BundlePool.prototype.getSrc = function()
{
    return this._bundle.getPath(
        this._srcDir,
        this._glob
    );
};


module.exports = BundlePool;
