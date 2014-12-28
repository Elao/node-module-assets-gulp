'use strict';


var
    Library = require('./Library');


/**
 * Library Pattern Solver
 */
function LibraryPatternSolver(fileSystem)
{
    this._fileSystem = fileSystem;
}


/**
 * Match a pattern
 */
LibraryPatternSolver.prototype.match = function(pattern)
{
    return 'path' in pattern;
};

/**
 * Solve a pattern into an array of libraries
 */
LibraryPatternSolver.prototype.solve = function(pattern)
{
    var
        libraries = [],
        path = this._fileSystem.normalizePath(pattern.path);

    if (this._fileSystem.hasPath(path)) {
        libraries.push(new Library(
            path,
            pattern.description
        ));
    }

    return libraries;
};


module.exports = LibraryPatternSolver;
