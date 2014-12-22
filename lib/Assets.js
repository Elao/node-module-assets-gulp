'use strict';


var
    AssetsPoolCollection = require('./AssetsPoolCollection'),
    AssetsLibraryCollection = require('./AssetsLibraryCollection');


/**
 * Assets
 */
function Assets(path) {

    // Path
    this.path = typeof(path) !== 'undefined' ? path : '';

    // Pools
    this.pools = new AssetsPoolCollection();

    // Libraries
    this.libraries = new AssetsLibraryCollection();
}


module.exports = Assets;
