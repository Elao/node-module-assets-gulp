'use strict';


/**
 * Pool
 */
function Pool(handler, name, src)
{
	this._handler = handler;
    this._name = name;
    this._src  = src;
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
    return this._handler.getDestDirPath();
};


module.exports = Pool;
