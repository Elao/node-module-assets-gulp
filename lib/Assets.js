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

module.exports = Assets;
