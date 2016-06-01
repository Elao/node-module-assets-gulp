// Polyfills
require('es6-promise').polyfill();

// Assets
var
	assets = require('./assets');

module.exports = assets;

// Tasks
require('require-dir')('./tasks');
