'use strict';


/**
 * Assets Options
 */
function AssetsOptions(options)
{
    options = typeof(options) !== 'undefined' ? options : {};

    this._options = {
        cwd: typeof(options.cwd) !== 'undefined' ? options.cwd : '',
        dest: typeof(options.dest) !== 'undefined' ? options.dest : 'web/assets',
        bundleDir: typeof(options.bundleDir) !== 'undefined' ? options.bundleDir : 'assets',
        libraryDir: typeof(options.libraryDir) !== 'undefined' ? options.libraryDir : 'components'
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
