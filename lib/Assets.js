'use strict';

var
	AssetsPoolCollection = require('./AssetsPoolCollection'),
    AssetsComponentsPoolCollection = require('./AssetsComponentsPoolCollection');

/**
 * Assets Pool
 */
function Assets() {
    // Pools
    this.pools = new AssetsPoolCollection();

    // Components pools
    this.componentsPools = new AssetsComponentsPoolCollection();
}

module.exports = Assets;
