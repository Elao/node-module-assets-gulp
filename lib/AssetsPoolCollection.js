'use strict';


var
    extend = require('extend');


/**
 * Assets Pool Collection
 */
function AssetsPoolCollection() {
    this.pools = {};
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
 * All
 */
AssetsPoolCollection.prototype.all = function() {
    if (!this.patternsResolved) {
        this.patterns.forEach(function(pattern) {
            this.patternResolvers.forEach(function(patternResolver) {
                if (patternResolver.match(pattern.pattern)) {
                    extend(this.pools, patternResolver.resolve(pattern.id, pattern.pattern));
                }
            }.bind(this));
        }.bind(this));

        this.patternsResolved = true;
    }

    return this.pools;
};

/**
 * Count
 */
AssetsPoolCollection.prototype.count = function() {
    return Object.keys(this.all()).length;
};

/**
 * For each
 */
AssetsPoolCollection.prototype.forEach = function(callback) {

    var
        pools = this.all();

    Object.keys(pools).forEach(function(id) {
        callback(pools[id], id);
    });
};

/**
 * Find paths
 */
AssetsPoolCollection.prototype.paths = function() {
    var
        paths = [];

    this.forEach(function(pool) {
        paths.push(pool.path);
    });

    return paths;
};


module.exports = AssetsPoolCollection;
