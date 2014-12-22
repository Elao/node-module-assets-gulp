'use strict';


var
    extend = require('extend');


/**
 * Assets Library Collection
 */
function AssetsLibraryCollection() {
    this.libraries = {};
    this.patterns = [];
    this.patternResolvers = [];

    this.patternsResolved = false;
}


/**
 * Add pattern resolver
 */
AssetsLibraryCollection.prototype.addPatternResolver = function(patternResolver) {

    this.patternResolvers.push(patternResolver);

    return this;
};

/**
 * Add pattern
 */
AssetsLibraryCollection.prototype.addPattern = function(id, pattern) {

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
AssetsLibraryCollection.prototype.all = function() {
    if (!this.patternsResolved) {
        this.patterns.forEach(function(pattern) {
            this.patternResolvers.forEach(function(patternResolver) {
                if (patternResolver.match(pattern.pattern)) {
                    extend(this.libraries, patternResolver.resolve(pattern.id, pattern.pattern));
                }
            }.bind(this));
        }.bind(this));

        this.patternsResolved = true;
    }

    return this.libraries;
};

/**
 * Count
 */
AssetsLibraryCollection.prototype.count = function() {
    return Object.keys(this.all()).length;
};

/**
 * For each
 */
AssetsLibraryCollection.prototype.forEach = function(callback) {

    var
        libraries = this.all();

    Object.keys(libraries).forEach(function(id) {
        callback(libraries[id], id);
    });
};

/**
 * Find paths
 */
AssetsLibraryCollection.prototype.paths = function() {

    var
        paths = [];

    this.forEach(function(library) {
        paths.push(library.path);
    });

    return paths;
};


module.exports = AssetsLibraryCollection;
