'use strict';

var
    AssetsPool = require('./AssetsPool');

/**
 * Assets Pool Pattern Path Resolver
 */
function AssetsPoolPatternPathResolver() {
}

/**
 * Match a pool pattern
 */
AssetsPoolPatternPathResolver.prototype.match = function(poolPattern) {
	return 'path' in poolPattern;
};

/**
 * Resolve a pool pattern into an array of pools
 */
AssetsPoolPatternPathResolver.prototype.resolve = function(poolPattern) {
	var
		pools = [];

	pools.push(new AssetsPool('foo', 'bar'));
	
	return pools;
};

module.exports = AssetsPoolPatternPathResolver;
