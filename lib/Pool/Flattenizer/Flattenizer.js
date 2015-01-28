'use strict';


var
    FlattenPool = require('./FlattenPool');


/**
 * Flattenizer
 */
function Flattenizer(fileSystem)
{
    this._fileSystem = fileSystem;
}


/**
 * Flatten
 */
Flattenizer.prototype.flatten = function(pool)
{
    var
        pools = [];

    this._fileSystem.glob(
        pool.getSrc()
    ).forEach(function(src) {
        pools.push(new FlattenPool(pool, src));
    });

    return pools;
};


module.exports = Flattenizer;
