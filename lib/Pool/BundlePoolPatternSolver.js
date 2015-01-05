'use strict';


var
    PoolPatternSolver = require('./PoolPatternSolver'),
    BundlePool = require('./BundlePool');


/**
 * Bundle Pool Pattern Solver
 */
function BundlePoolPatternSolver(bundles, fileSystem)
{
    this._bundles = bundles;
    this._fileSystem = fileSystem;
}


BundlePoolPatternSolver.prototype = Object.create(PoolPatternSolver.prototype);


/**
 * Match a pattern
 */
BundlePoolPatternSolver.prototype.match = function(pattern)
{
    return 'src_dir' in pattern;
};

/**
 * Solve a pattern into an array of pools
 */
BundlePoolPatternSolver.prototype.solve = function(pattern)
{
    var
        pools = [];

    this._bundles.forEach(function(bundle) {
        if (bundle.hasDir(pattern.src_dir)) {
            pools.push(new BundlePool(
                bundle,
                pattern.src_dir,
                pattern.dest_dir,
                pattern.glob,
                this._fileSystem
            ));
        }
    }.bind(this));

    return pools;
};


module.exports = BundlePoolPatternSolver;
