'use strict';

/**
 * Assets Pool
 */
function AssetsPool(id, path, description) {
    this.id = id ? id : null;
    this.path = path ? path : null;
    this.description = description ? description : null;
}


/**
 * Has Description
 */
AssetsPool.prototype.hasDescription = function() {
    return this.description ? true : false;
};


module.exports = AssetsPool;
