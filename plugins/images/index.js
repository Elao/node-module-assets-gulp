'use strict';

var
    AssetsHandler = require('../../lib/AssetsHandler');

module.exports = function(assets, gulp) {

assets
    .handlers
        .add('images', new AssetsHandler());

};
