'use strict';


var
    PoolPatternSolver = require('./PoolPatternSolver'),
    BundlePool = require('./BundlePool');


/**
 * Bundle Pool Pattern Solver
 */
function BundlePoolPatternSolver(handler, bundles)
{
    this._bundles = bundles;

    PoolPatternSolver.call(this, handler);
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

    this._bundles.find().forEach(function(bundle) {
        if (bundle.hasDir(pattern.srcDir)) {
            pools.push(new BundlePool(
                this._handler,
                bundle,
                pattern.srcDir,
                pattern.glob
            ));
        }
    }.bind(this));

    return pools;
};


module.exports = BundlePoolPatternSolver;
