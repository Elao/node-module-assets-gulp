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
 * Get Path
 */
AssetsFileSystem.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._options.get('cwd'));

    return _path.join.apply(
        _path,
        args
    );
};

/**
 * Has Path
 */
AssetsFileSystem.prototype.hasPath = function(path)
{
    return _fs.existsSync(
        this.getPath(path)
    );
};

/**
 * Glob
 */
AssetsFileSystem.prototype.glob = function(glob)
{
    return _glob.sync(
        glob,
        {
            cwd: this._options.get('cwd'),
            symlinks: this._globSymlinks,
            statCache: this._globStatCache,
            cache: this._globCache
        }
    );
};

/**
 * Get dest path
 */
AssetsFileSystem.prototype.getDestPath = function()
{
    return this.getPath(
        this._options.get('dest')
    );
};

/**
 * Get dest dir path
 */
AssetsFileSystem.prototype.getDestDirPath = function(dir)
{
    return this.getPath(
        this.join(
            this._options.get('dest'),
            dir
        )
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

    _fs.readdir(path, function(error, files) {
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
