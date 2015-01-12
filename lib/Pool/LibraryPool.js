'use strict';


var
    Pool = require('./Pool');


/**
 * Library Pool
 */
function LibraryPool(handler, library, name, src)
{
    this._library = library;
    
    Pool.call(this, handler, name, src);
}


LibraryPool.prototype = Object.create(Pool.prototype);


/**
 * Get Src
 */
LibraryPool.prototype.getSrc = function()
{
    console.log(this._src);
    console.log(this._library.getPath());
    return this._library.getPath(
        this._src
    );
};


module.exports = LibraryPool;
