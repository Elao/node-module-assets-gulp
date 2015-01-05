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

/**
 * Rimraf path
 *
 * Use custom delete method instead of dedicated module such as "del"
 * to lighten dependencies
 * See: https://github.com/isaacs/rimraf/issues/36#issuecomment-39755124
 */
AssetsFileSystem.prototype.rimrafPath = function(path, callback)
{
    var
        rimraf = require('rimraf');

    _fs.readdir(path, function(error, files)
    {
        var
            n = 0,
            errorState = null;

        if (error) {
            return callback(
                error.code === 'ENOENT' ? null : error
            );
        }

        if (files.length === 0) {
            return process.nextTick(callback);
        }

        files.forEach(function(file) {
            if (file === '.' || file === '..') {
                return process.nextTick(next);
            }
            rimraf(_path.join(path, file), next);
        });

        function next(error) {
            if (errorState) {
                return;
            } else if (error) {
                return callback(errorState = error);
            } else if (--n === 0) {
                return callback();
            }
        }
    });
};


module.exports = AssetsFileSystem;
