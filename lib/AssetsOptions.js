'use strict';


var
    _util = require('gulp-util');


/**
 * Assets Options
 */
function AssetsOptions(options)
{
    this._options = require('defaults')(options || {}, {
        cwd:    '',
        dest:   'web/assets',
        debug:  _util.env.dev || false,
        silent: _util.env.silent || false,
        pools:  typeof(_util.env.pools) === 'string' ? _util.env.pools.split(',') : null
    });
}


/**
 * Get
 */
AssetsOptions.prototype.get = function(option, def)
{
    if (typeof(this._options[option]) === 'undefined') {
        return typeof(def) !== 'undefined' ? def : null;
    }

    return this._options[option];
};

/**
 * Is
 */
AssetsOptions.prototype.is = function(option, def)
{
    return this.get(
        option,
        typeof(def) !== 'undefined' ? def : false
    ) ? true : false;
};


module.exports = AssetsOptions;
