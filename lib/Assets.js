'use strict';

var
	AssetsPoolCollection = require('./AssetsPoolCollection'),
    AssetsComponentsPoolCollection = require('./AssetsComponentsPoolCollection');

/**
 * Assets Pool
 */
function Assets(path) {
    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';

    // Pools
    this.pools = new AssetsPoolCollection();

    // Components pools
    this.componentsPools = new AssetsComponentsPoolCollection();
}

module.exports = Assets;
