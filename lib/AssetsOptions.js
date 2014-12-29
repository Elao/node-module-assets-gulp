'use strict';


/**
 * Assets Options
 */
function AssetsOptions(options)
{
    options = typeof(options) !== 'undefined' ? options : {};

    this._options = {
        cwd: typeof(options.cwd) !== 'undefined' ? options.cwd : ''
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


module.exports = AssetsOptions;
