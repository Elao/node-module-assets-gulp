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
 * Get Id
 */
AssetsComponentsPool.prototype.getId = function() {
    return this.id;
};

/**
 * Get Path
 */
AssetsComponentsPool.prototype.getPath = function() {
    return this.path;
};

/**
 * Has Description
 */
AssetsComponentsPool.prototype.hasDescription = function() {
    return this.description ? true : false;
};

/**
 * Get Description
 */
AssetsComponentsPool.prototype.getDescription = function() {
    return this.description;
};


module.exports = AssetsComponentsPool;
