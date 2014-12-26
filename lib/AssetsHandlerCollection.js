'use strict';


/**
 * Assets Handler Collection
 */
function AssetsHandlerCollection()
{
    this.handlers = [];
}


/**
 * Add
 */
AssetsHandlerCollection.prototype.add = function(handler)
{
    this.handlers.push(handler);

    return this;
};

/**
 * Get
 */
AssetsHandlerCollection.prototype.get = function(id)
{
    var
        handlerReturn;

    this.handlers.some(function(handler) {
        if (handler.id === id) {
            handlerReturn = handler;
            return true;
        }
    });

    if (typeof(handlerReturn) === 'undefined') {
        throw 'Could not find handler with id "' + id + '"';
    }

    return handlerReturn;
};

/**
 * Count
 */
AssetsHandlerCollection.prototype.count = function()
{
    return this.handlers.length;
};

/**
 * For each
 */
AssetsHandlerCollection.prototype.forEach = function(callback)
{
    this.handlers.forEach(function(handler) {
        callback(handler);
    }.bind(this));
};


module.exports = AssetsHandlerCollection;
