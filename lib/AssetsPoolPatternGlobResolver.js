'use strict';

var
    AssetsPool = require('./AssetsPool');

/**
 * Assets Pool Pattern Glob Resolver
 */
function AssetsPoolPatternGlobResolver() {
}

/**
 * Match a pool pattern
 */
AssetsPoolPatternGlobResolver.prototype.match = function(poolPattern) {
	return 'glob' in poolPattern;
};

/**
 * Resolve a pool pattern into an array of pools
 */
AssetsPoolPatternGlobResolver.prototype.resolve = function(poolPattern) {
	var
		pools = [];

	pools.push(new AssetsPool('bar', 'foo'));
	
	return pools;
};

module.exports = AssetsPoolPatternGlobResolver;
