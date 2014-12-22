'use strict';


/**
 * Assets Handler Collection
 */
function AssetsHandlerCollection() {
    this.handlers = {};
}


/**
 * Add
 */
AssetsHandlerCollection.prototype.add = function(id, handler) {

    this.handlers[id] = handler;

    return this;
};

/**
 * Count
 */
AssetsHandlerCollection.prototype.count = function() {
    return Object.keys(this.handlers).length;
};

/**
 * For each
 */
AssetsHandlerCollection.prototype.forEach = function(callback) {

    Object.keys(this.handlers).forEach(function(id) {
        callback(this.handlers[id], id);
    }.bind(this));
};


module.exports = AssetsHandlerCollection;
