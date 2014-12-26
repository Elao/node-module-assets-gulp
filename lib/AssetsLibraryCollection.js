'use strict';


/**
 * Assets Library Collection
 */
function AssetsLibraryCollection() {
    this.libraries = [];
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
AssetsLibraryCollection.prototype.addPattern = function(pattern) {

    this.patterns.push(pattern);

    return this;
};

/**
 * All
 */
AssetsLibraryCollection.prototype.all = function() {
    if (!this.patternsResolved) {
        this.patterns.forEach(function(pattern) {
            this.patternResolvers.forEach(function(patternResolver) {
                if (patternResolver.match(pattern)) {
                    this.libraries = this.libraries.concat(patternResolver.resolve(pattern));
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
    return this.all().length;
};

/**
 * For each
 */
AssetsLibraryCollection.prototype.forEach = function(callback) {

    this.all().forEach(function(library) {
        callback(library);
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
