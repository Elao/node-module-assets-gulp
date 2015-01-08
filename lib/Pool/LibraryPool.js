'use strict';


var
    Pool = require('./Pool');


/**
 * Library Pool
 */
function LibraryPool(fileSystem, library, name, src)
{
    this._fileSystem = fileSystem;

    this._library = library;
    
    Pool.call(this, name, src);
}


LibraryPool.prototype = Object.create(Pool.prototype);


/**
 * Get Src
 */
LibraryPool.prototype.getSrc = function()
{
    return this._fileSystem.join(
        this._library.getPath(),
        this._src
    );
};

/**
 * Get Dest
 */
LibraryPool.prototype.getDest = function()
{
    return '';
};


module.exports = LibraryPool;
