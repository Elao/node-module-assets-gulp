'use strict';

/**
 * Assets Pool
 */
function Assets() {
    this.pools = [];
}


/**
 * Get pools
 */
Assets.prototype.getPools = function() {
    return this.pools;
};

/**
 * Add pool
 */
Assets.prototype.addPool = function(pool) {
    
    this.pools.push(pool);

    return this;
};


module.exports = Assets;
