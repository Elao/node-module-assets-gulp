'use strict';


/**
 * Handler Collection
 */
function HandlerCollection()
{
    this._handlers = [];
}


/**
 * Add
 */
HandlerCollection.prototype.add = function(handler)
{
    this._handlers.push(handler);

    return this;
};

/**
 * Get
 */
HandlerCollection.prototype.get = function(id)
{
    var
        handlerReturn;

    this._handlers.some(function(handler) {
        if (handler.getId() === id) {
            handlerReturn = handler;
            return true;
        }
    });

    if (typeof(handlerReturn) === 'undefined') {
        throw new Error('Could not find handler with id "' + id + '"');
    }

    return handlerReturn;
};

/**
 * Count
 */
HandlerCollection.prototype.count = function()
{
    return this._handlers.length;
};

/**
 * For each
 */
HandlerCollection.prototype.forEach = function(callback)
{
    this._handlers.forEach(function(handler) {
        callback(handler);
    }.bind(this));
};


module.exports = HandlerCollection;
