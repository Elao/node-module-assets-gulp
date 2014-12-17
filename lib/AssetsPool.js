'use strict';

/**
 * Assets Pool
 */
function AssetsPool(name, path) {
    this.name = name ? name : null;
    this.path = path ? path : null;
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

module.exports = AssetsPool;
