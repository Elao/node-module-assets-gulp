'use strict';


var
    Pool = require('./Pool');


/**
 * Library Pool
 */
function LibraryPool(handler, library, name, src, dest)
{
    this._library = library;

    Pool.call(this, handler, name, src, dest);
}


LibraryPool.prototype = Object.create(Pool.prototype);


/**
 * Get src
 */
LibraryPool.prototype.getSrc = function()
{
    return this._library.getPath(
        this._src
    );
};


module.exports = LibraryPool;
