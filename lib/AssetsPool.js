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
 * Get Id
 */
AssetsPool.prototype.getId = function() {
    return this.id;
};

/**
 * Get Path
 */
AssetsPool.prototype.getPath = function() {
    return this.path;
};

/**
 * Has Description
 */
AssetsPool.prototype.hasDescription = function() {
    return this.description ? true : false;
};

/**
 * Get Description
 */
AssetsPool.prototype.getDescription = function() {
    return this.description;
};


module.exports = AssetsPool;
