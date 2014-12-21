'use strict';


/**
 * Assets Pool
 */
function AssetsPool(path, description) {
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
