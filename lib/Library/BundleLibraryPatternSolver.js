'use strict';


var
    LibraryPatternSolver = require('./LibraryPatternSolver'),
    BundleLibrary = require('./BundleLibrary');


/**
 * Bundle Library Pattern Solver
 */
function BundleLibraryPatternSolver(bundles)
{
    this._bundles = bundles;
}


BundleLibraryPatternSolver.prototype = Object.create(LibraryPatternSolver.prototype);


/**
 * Match a pattern
 */
BundleLibraryPatternSolver.prototype.match = function(pattern)
{
    return 'dir' in pattern;
};

/**
 * Solve a pattern into an array of libraries
 */
BundleLibraryPatternSolver.prototype.solve = function(pattern)
{
    var
        libraries = [];

    this._bundles.find().forEach(function(bundle) {
        if (bundle.hasDir(pattern.dir)) {
            libraries.push(new BundleLibrary(
                bundle,
                pattern.dir
            ));
        }
    });

    return libraries;
};


module.exports = BundleLibraryPatternSolver;
