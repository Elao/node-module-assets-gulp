'use strict';


var
    PoolPatternSolver = require('./PoolPatternSolver'),
    LibraryPool = require('./LibraryPool');


/**
 * Library Pool Pattern Solver
 */
function LibraryPoolPatternSolver(fileSystem, libraries)
{
    this._fileSystem = fileSystem;

    this._libraries = libraries;
}


LibraryPoolPatternSolver.prototype = Object.create(PoolPatternSolver.prototype);


/**
 * Match a pattern
 */
LibraryPoolPatternSolver.prototype.match = function(pattern)
{
    return 'src' in pattern;
};

/**
 * Solve a pattern into an array of pools
 */
LibraryPoolPatternSolver.prototype.solve = function(pattern)
{
    var
        pools = [];

    // Try to find src glob in every available library
    this._libraries.find().forEach(function(library) {
        if (library.glob(pattern.src).length) {
            pools = [
                new LibraryPool(
                    this._fileSystem,
                    library,
                    pattern.name,
                    pattern.src
                )
            ];
        }
    }.bind(this));

    return pools;
};


module.exports = LibraryPoolPatternSolver;
