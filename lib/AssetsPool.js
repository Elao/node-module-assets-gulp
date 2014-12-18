'use strict';

/**
 * Assets Pool
 */
function AssetsPool(name, path, comment) {
    this.name    = name    ? name    : null;
    this.path    = path    ? path    : null;
    this.comment = comment ? comment : null;
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
 * Has Comment
 */
AssetsPool.prototype.hasComment = function() {
    return this.comment ? true : false;
};

/**
 * Get Comment
 */
AssetsPool.prototype.getComment = function() {
    return this.comment;
};


module.exports = AssetsPool;
