'use strict';


var
    _fs = require('fs'),
    _path = require('path'),
    _glob = require('glob');


/**
 * Assets File System
 */
function AssetsFileSystem(options)
{
    this._options = options;

    // Glob options to speed up
    this._globSymlinks = Object.create(null);
    this._globStatCache = Object.create(null);
    this._globCache = Object.create(null);
}


/**
 * Join
 */
AssetsFileSystem.prototype.join = function(path1, path2)
{
    return _path.join(path1, path2);
};

/**
 * Normalize Path
 */
AssetsFileSystem.prototype.normalizePath = function(path)
{
    return this.join(this._options.get('path'), path);
};

/**
 * Has Path
 */
AssetsFileSystem.prototype.hasPath = function(path)
{
    return _fs.existsSync(path);
};

/**
 * Normalize Glob
 */
AssetsFileSystem.prototype.normalizeGlob = function(glob)
{
    return this.join(this._options.get('path'), glob);
};

/**
 * Glob
 */
AssetsFileSystem.prototype.glob = function(glob)
{
    return _glob.sync(
        glob,
        {
            symlinks: this._globSymlinks,
            statCache: this._globStatCache,
            cache: this._globCache
        }
    );
};


module.exports = AssetsFileSystem;
