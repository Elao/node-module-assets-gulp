'use strict';

/**
 * Assets Pool
 */
function AssetsPool(name, path, description) {
    this.name = name ? name : null;
    this.path = path ? path : null;
    this.description = description ? description : null;
}


/**
 * Get Name
 */
AssetsPool.prototype.getName = function() {
    return this.name;
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
