'use strict';


/**
 * Pool
 */
function Pool(name, src, dest)
{
    this._name = name;
    this._src  = src;
    this._dest = dest;
}


/**
 * Get Name
 */
Pool.prototype.getName = function()
{
    return this._name;
};

/**
 * Get Src
 */
Pool.prototype.getSrc = function()
{
    return this._src;
};

/**
 * Get Dest
 */
Pool.prototype.getDest = function()
{
    return this._dest;
};


module.exports = Pool;
