'use strict';


var
    PoolCollection = require('./Pool/PoolCollection');

/**
 * Handler
 */
function Handler(id, description)
{
    this._id = id;
    this._description = typeof(description) !== 'undefined' ? description : null;

    // Pools
    this.pools = new PoolCollection();
}


/**
 * Get Id
 */
Handler.prototype.getId = function()
{
    return this._id;
};

/**
 * Has Description
 */
Handler.prototype.hasDescription = function()
{
    return this._description ? true : false;
};

/**
 * Get Description
 */
Handler.prototype.getDescription = function()
{
    return this._description;
};

/**
 * Add pool pattern solver
 */
Handler.prototype.addPoolPatternSolver = function(solver)
{
    this.pools
        .addPatternSolver(solver);

    return this;
};

/**
 * Add pool pattern
 */
Handler.prototype.addPoolPattern = function(pattern)
{
    this.pools
        .addPattern(pattern);

    return this;
};


module.exports = Handler;
