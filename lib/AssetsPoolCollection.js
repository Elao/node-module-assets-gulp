'use strict';


/**
 * Assets Pool Collection
 */
function AssetsPoolCollection() {
    this.pools = [];
    this.patterns = [];
    this.patternResolvers = [];

    this.patternsResolved = false;
}


/**
 * Add pattern resolver
 */
AssetsPoolCollection.prototype.addPatternResolver = function(patternResolver) {

    this.patternResolvers.push(patternResolver);

    return this;
};

/**
 * Add pattern
 */
AssetsPoolCollection.prototype.addPattern = function(id, pattern) {

    this.patterns.push({id: id, pattern: pattern});

    return this;
};

/**
 * Find
 */
AssetsPoolCollection.prototype.find = function() {
    if (!this.patternsResolved) {
        this.patterns.forEach(function(pattern) {
            this.patternResolvers.forEach(function(patternResolver) {
                if (patternResolver.match(pattern.pattern)) {
                    this.pools = this.pools.concat(
                        patternResolver.resolve(pattern.id, pattern.pattern)
                    );
                }
            }.bind(this));
        }.bind(this));

        this.patternsResolved = true;
    }

    return this.pools;
};

/**
 * Find paths
 */
AssetsPoolCollection.prototype.findPaths = function() {
    var
        paths = [];

    this.find().forEach(function(pool) {
        paths.push(pool.path);
    });

    return paths;
};


module.exports = AssetsPoolCollection;
