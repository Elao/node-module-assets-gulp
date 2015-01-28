'use strict';


var
    Pool = require('../Pool');


/**
 * Flatten Pool
 */
function FlattenPool(pool, src)
{
    this._pool = pool;

    Pool.call(this, null, src);
}


FlattenPool.prototype = Object.create(Pool.prototype);


/**
 * Get name
 */
FlattenPool.prototype.getName = function()
{
    return this._pool.getName();
};

/**
 * Get dest
 */
FlattenPool.prototype.getDest = function()
{
    return this._pool.getDest();
};


module.exports = FlattenPool;
