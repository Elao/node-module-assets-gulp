'use strict';


var
    Bundle = require('./Bundle');


/**
 * Bundle Pattern Solver
 */
function BundlePatternSolver(fileSystem)
{
    this._fileSystem = fileSystem;
}


/**
 * Match a pattern
 */
BundlePatternSolver.prototype.match = function(pattern)
{
    return 'path' in pattern;
};

/**
 * Solve a pattern into an array of bundles
 */
BundlePatternSolver.prototype.solve = function(id, pattern)
{
    var
        bundles = [],
        path = this._fileSystem.normalizePath(pattern.path);

    if (this._fileSystem.hasPath(path)) {
        bundles.push(new Bundle(
            this._fileSystem,
            id,
            path,
            pattern.description
        ));
    }

    return bundles;
};


module.exports = BundlePatternSolver;
