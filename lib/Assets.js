'use strict';

/**
 * Assets Pool
 */
function Assets(path) {

    var
        AssetsPoolCollection = require('./AssetsPoolCollection'),
        AssetsComponentsPoolCollection = require('./AssetsComponentsPoolCollection');

    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';

    // Pools
    this.pools = new AssetsPoolCollection();

    // Components pools
    this.componentsPools = new AssetsComponentsPoolCollection();
}


module.exports = Assets;
