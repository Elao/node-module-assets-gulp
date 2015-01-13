'use strict';


/**
 * Pool
 */
function Pool(handler, name, src, dest)
{
	this._handler = handler;
    this._name = name;
    this._src  = src;
    this._dest = typeof(dest) !== 'undefined' ? dest : '';
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
    return this._handler.getDestPath(
    	this._dest
    );
};


module.exports = Pool;
