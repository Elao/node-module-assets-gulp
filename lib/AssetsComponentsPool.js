'use strict';

/**
 * Assets Components Pool
 */
function AssetsComponentsPool(id, path, description) {
    this.id = id ? id : null;
    this.path = path ? path : null;
    this.description = description ? description : null;
}


/**
 * Has Description
 */
AssetsComponentsPool.prototype.hasDescription = function() {
    return this.description ? true : false;
};


module.exports = AssetsComponentsPool;
