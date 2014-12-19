'use strict';

/**
 * Assets Components Pool Collection
 */
function AssetsComponentsPoolCollection() {
    this.pools = [];
    this.patterns = [];
    this.patternResolvers = [];

    this.patternsResolved = false;
}

/**
 * Add pattern resolver
 */
AssetsComponentsPoolCollection.prototype.addPatternResolver = function(patternResolver) {

    this.patternResolvers.push(patternResolver);

    return this;
};

/**
 * Add pattern
 */
AssetsComponentsPoolCollection.prototype.addPattern = function(pattern) {

    this.patterns.push(pattern);

    return this;
};

/**
 * Find
 */
AssetsComponentsPoolCollection.prototype.find = function() {
	if (!this.patternsResolved) {
		this.patterns.forEach(function(pattern) {
			this.patternResolvers.forEach(function(patternResolver) {
				if (patternResolver.match(pattern)) {
					this.pools = this.pools.concat(
						patternResolver.resolve(pattern)
					);
				}
			}.bind(this));
		}.bind(this));

		this.patternsResolved = true;
	}

    return this.pools;
};


module.exports = AssetsComponentsPoolCollection;
