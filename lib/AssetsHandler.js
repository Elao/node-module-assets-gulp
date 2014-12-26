'use strict';


/**
 * Assets Handler
 */
function AssetsHandler(id, description)
{
    this.id = id;
    this.description = typeof(description) !== 'undefined' ? description : null;
}


/**
 * Has Description
 */
AssetsHandler.prototype.hasDescription = function()
{
    return this.description ? true : false;
};


module.exports = AssetsHandler;
