'use strict';


var
    Bundle = require('./Bundle');


/**
 * Glob Bundle Pattern Solver
 */
function GlobBundlePatternSolver(fileSystem)
{
    this._fileSystem = fileSystem;
}


/**
 * Match a pattern
 */
GlobBundlePatternSolver.prototype.match = function(pattern)
{
    return 'glob' in pattern;
};

/**
 * Solve a pattern into an array of bundles
 */
GlobBundlePatternSolver.prototype.solve = function(id, pattern)
{
    var
        bundles = [],
        glob = this._fileSystem.normalizePathGlob(pattern.glob);

    this._fileSystem.glob(glob).forEach(function(path) {
        bundles.push(new Bundle(
            id,
            path,
            pattern.description,
            this._fileSystem
        ));
    }.bind(this));

    return bundles;
};


module.exports = GlobBundlePatternSolver;
