'use strict';


var
    AssetsPoolCollection = require('./AssetsPoolCollection'),
    AssetsLibraryCollection = require('./AssetsLibraryCollection'),
    AssetsHandlerCollection = require('./AssetsHandlerCollection');


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

    // Handlers
    this.handlers = new AssetsHandlerCollection();
}


module.exports = Assets;
