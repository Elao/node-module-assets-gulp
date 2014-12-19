'use strict';

/**
 * Assets Pool
 */
function AssetsPool(id, path, description) {
    this.id = id;
    this.path = path;
    this.description = typeof(description) !== 'undefined' ? description : null;
}


/**
 * Has Description
 */
AssetsPool.prototype.hasDescription = function() {
    return this.description ? true : false;
};


module.exports = AssetsPool;
