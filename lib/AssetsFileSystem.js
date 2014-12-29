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
 * Join Path
 */
AssetsFileSystem.prototype.joinPath = function(path1, path2)
{
    return _path.join(path1, path2);
};

/**
 * Normalize Path
 */
AssetsFileSystem.prototype.normalizePath = function(path)
{
    return this.joinPath(this._options.get('cwd'), path);
};

/**
 * Has Path
 */
AssetsFileSystem.prototype.hasPath = function(path)
{
    return _fs.existsSync(path);
};

/**
 * Join Path Glob
 */
AssetsFileSystem.prototype.joinPathGlob = function(path, glob)
{
    return _path.join(path, glob);
};

/**
 * Normalize Path Glob
 */
AssetsFileSystem.prototype.normalizePathGlob = function(glob)
{
    return this.joinPathGlob(this._options.get('cwd'), glob);
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
