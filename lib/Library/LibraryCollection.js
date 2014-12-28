'use strict';


/**
 * Library Collection
 */
function LibraryCollection()
{
    this._libraries = [];
    this._patterns = [];
    this._patternSolvers = [];

    this._patternsSolved = false;
}


/**
 * Add pattern solver
 */
LibraryCollection.prototype.addPatternSolver = function(solver)
{
    this._patternSolvers.push(solver);

    return this;
};

/**
 * Add pattern
 */
LibraryCollection.prototype.addPattern = function(pattern)
{
    this._patterns.push(pattern);

    return this;
};

/**
 * All
 */
LibraryCollection.prototype.all = function()
{
    if (!this._patternsSolved) {
        this._patterns.forEach(function(pattern) {
            this._patternSolvers.forEach(function(patternSolver) {
                if (patternSolver.match(pattern)) {
                    this._libraries = this._libraries.concat(patternSolver.solve(pattern));
                }
            }.bind(this));
        }.bind(this));

        this._patternsSolved = true;
    }

    return this._libraries;
};

/**
 * Count
 */
LibraryCollection.prototype.count = function()
{
    return this.all().length;
};

/**
 * For each
 */
LibraryCollection.prototype.forEach = function(callback)
{
    this.all().forEach(function(library) {
        callback(library);
    });
};

/**
 * Get paths
 */
LibraryCollection.prototype.getPaths = function()
{
    var
        paths = [];

    this.forEach(function(library) {
        paths.push(library.getPath());
    });

    return paths;
};


module.exports = LibraryCollection;
