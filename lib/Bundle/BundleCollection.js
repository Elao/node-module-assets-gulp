'use strict';


/**
 * Bundle Collection
 */
function BundleCollection()
{
    this._bundles = [];
    this._patterns = [];
    this._patternSolvers = [];

    this._patternsSolved = false;
}


/**
 * Add pattern solver
 */
BundleCollection.prototype.addPatternSolver = function(solver)
{
    this._patternSolvers.push(solver);

    return this;
};

/**
 * Add pattern
 */
BundleCollection.prototype.addPattern = function(id, pattern)
{
    this._patterns.push({id: id, pattern: pattern});

    return this;
};

/**
 * All
 */
BundleCollection.prototype.all = function()
{
    if (!this._patternsSolved) {
        this._patterns.forEach(function(pattern) {
            this._patternSolvers.forEach(function(patternSolver) {
                if (patternSolver.match(pattern.pattern)) {
                    this._bundles = this._bundles.concat(patternSolver.solve(pattern.id, pattern.pattern));
                }
            }.bind(this));
        }.bind(this));

        this._patternsSolved = true;
    }

    return this._bundles;
};

/**
 * Count
 */
BundleCollection.prototype.count = function()
{
    return this.all().length;
};

/**
 * For each
 */
BundleCollection.prototype.forEach = function(callback)
{
    this.all().forEach(function(bundle) {
        callback(bundle);
    });
};

/**
 * Get paths
 */
BundleCollection.prototype.getPaths = function()
{
    var
        paths = [];

    this.forEach(function(bundle) {
        paths.push(bundle.getPath());
    });

    return paths;
};


module.exports = BundleCollection;
