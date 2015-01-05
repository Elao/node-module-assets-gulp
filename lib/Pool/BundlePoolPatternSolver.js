'use strict';


var
    PoolPatternSolver = require('./PoolPatternSolver'),
    BundlePool = require('./BundlePool');


/**
 * Bundle Pool Pattern Solver
 */
function BundlePoolPatternSolver(fileSystem, bundles)
{
    this._fileSystem = fileSystem;

    this._bundles = bundles;
}


BundlePoolPatternSolver.prototype = Object.create(PoolPatternSolver.prototype);


/**
 * Match a pattern
 */
BundlePoolPatternSolver.prototype.match = function(pattern)
{
    return 'srcDir' in pattern;
};

/**
 * Solve a pattern into an array of pools
 */
BundlePoolPatternSolver.prototype.solve = function(pattern)
{
    var
        pools = [];

    this._bundles.forEach(function(bundle) {
        if (bundle.hasDir(pattern.srcDir)) {
            pools.push(new BundlePool(
                this._fileSystem,
                bundle,
                pattern.srcDir,
                pattern.destDir,
                pattern.glob
            ));
        }
    }.bind(this));

    return pools;
};


module.exports = BundlePoolPatternSolver;
