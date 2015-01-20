'use strict';


var
    _util = require('gulp-util');


/**
 * Assets Options
 */
function AssetsOptions(options)
{
    options = typeof(options) !== 'undefined' ? options : {};

    this._options = {
        cwd:   typeof(options.cwd)   !== 'undefined' ?
            options.cwd : '',
        dest:  typeof(options.dest)  !== 'undefined' ?
            options.dest : 'web/assets',
        debug: typeof(options.debug) !== 'undefined' ?
            options.debug : (_util.env.dev || false),
        silent: typeof(options.silent) !== 'undefined' ?
            options.silent : (_util.env.silent || false),
        pools: typeof(options.pools) !== 'undefined' ?
            options.pools : (typeof(_util.env.pools) === 'string' ? _util.env.pools.split(',') : null)
    };
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
