'use strict';


/**
 * Assets Library
 */
function AssetsLibrary(path, description)
{
    this.path = path;
    this.description = typeof(description) !== 'undefined' ? description : null;
}


/**
 * Has Description
 */
AssetsLibrary.prototype.hasDescription = function()
{
    return this.description ? true : false;
};


module.exports = AssetsLibrary;
