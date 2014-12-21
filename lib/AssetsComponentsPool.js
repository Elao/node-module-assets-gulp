'use strict';


/**
 * Assets Components Pool
 */
function AssetsComponentsPool(path, description) {
    this.path = path;
    this.description = typeof(description) !== 'undefined' ? description : null;
}


/**
 * Has Description
 */
AssetsComponentsPool.prototype.hasDescription = function() {
    return this.description ? true : false;
};


module.exports = AssetsComponentsPool;
