'use strict';


/**
 * Pool Collection
 */
function PoolCollection()
{
    this._pools = [];
    this._patterns = [];
    this._patternSolvers = [];

    this._patternsSolved = false;
}


/**
 * Add pattern solver
 */
PoolCollection.prototype.addPatternSolver = function(solver)
{
    this._patternSolvers.push(solver);

    return this;
};

/**
 * Add pattern
 */
PoolCollection.prototype.addPattern = function(pattern)
{
    this._patterns.push(pattern);

    return this;
};

/**
 * All
 */
PoolCollection.prototype.all = function()
{
    if (!this._patternsSolved) {
        this._patterns.forEach(function(pattern) {
            this._patternSolvers.forEach(function(patternSolver) {
                if (patternSolver.match(pattern)) {
                    this._pools = this._pools.concat(patternSolver.solve(pattern));
                }
            }.bind(this));
        }.bind(this));

        this._patternsSolved = true;
    }

    return this._pools;
};

/**
 * Count
 */
PoolCollection.prototype.count = function()
{
    return this.all().length;
};

/**
 * For each
 */
PoolCollection.prototype.forEach = function(callback)
{
    this.all().forEach(function(pool) {
        callback(pool);
    });
};


module.exports = PoolCollection;
