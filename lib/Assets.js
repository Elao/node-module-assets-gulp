'use strict';

/**
 * Assets Pool
 */
function Assets() {
    this.pools = [];
    this.poolPatterns = [];
    this.poolPatternResolvers = [];

    this.poolPatternsResolved = false;
}

/**
 * Add pool pattern resolver
 */
Assets.prototype.addPoolPatternResolver = function(poolPatternResolver) {
    
    this.poolPatternResolvers.push(poolPatternResolver);

    return this;
};

/**
 * Add pool pattern
 */
Assets.prototype.addPoolPattern = function(poolPattern) {
    
    this.poolPatterns.push(poolPattern);

    return this;
};

/**
 * Find pools
 */
Assets.prototype.findPools = function() {
	if (!this.poolPatternsResolved) {
		this.poolPatterns.forEach(function(poolPattern) {
			this.poolPatternResolvers.forEach(function(poolPatternResolver) {
				if (poolPatternResolver.match(poolPattern)) {
					this.pools = this.pools.concat(
						poolPatternResolver.resolve(poolPattern)
					);
				}
			}.bind(this));
		}.bind(this));
	}

    return this.pools;
};

module.exports = Assets;
