'use strict';


var
    extend = require('extend');


/**
 * Assets Components Pool Collection
 */
function AssetsComponentsPoolCollection() {
    this.pools = {};
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
AssetsComponentsPoolCollection.prototype.addPattern = function(id, pattern) {

    if (typeof(pattern) === 'undefined') {
        pattern = id;
        id = null;
    }

    this.patterns.push({id: id, pattern: pattern});

    return this;
};

/**
 * All
 */
AssetsComponentsPoolCollection.prototype.all = function() {
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
AssetsComponentsPoolCollection.prototype.count = function() {
    return Object.keys(this.all()).length;
};

/**
 * For each
 */
AssetsComponentsPoolCollection.prototype.forEach = function(callback) {

    var
        pools = this.all();

    Object.keys(pools).forEach(function(id) {
        callback(pools[id], id);
    });
};

/**
 * Find paths
 */
AssetsComponentsPoolCollection.prototype.paths = function() {

    var
        paths = [];

    this.forEach(function(pool) {
        paths.push(pool.path);
    });

    return paths;
};


module.exports = AssetsComponentsPoolCollection;
