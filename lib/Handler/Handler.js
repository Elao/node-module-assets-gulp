'use strict';


/**
 * Handler
 */
function Handler(id, description)
{
    this._id = id;
    this._description = typeof(description) !== 'undefined' ? description : null;
}


/**
 * Get Id
 */
Handler.prototype.getId = function()
{
    return this._id;
};

/**
 * Has Description
 */
Handler.prototype.hasDescription = function()
{
    return this._description ? true : false;
};

/**
 * Get Description
 */
Handler.prototype.getDescription = function()
{
    return this._description;
};

module.exports = Handler;
