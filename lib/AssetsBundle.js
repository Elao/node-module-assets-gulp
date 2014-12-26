'use strict';


/**
 * Assets Bundle
 */
function AssetsBundle(id, path, description)
{
    this.id = id;
    this.path = path;
    this.description = typeof(description) !== 'undefined' ? description : null;
}


/**
 * Has Description
 */
AssetsBundle.prototype.hasDescription = function()
{
    return this.description ? true : false;
};


module.exports = AssetsBundle;
