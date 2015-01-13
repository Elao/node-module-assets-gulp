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
 * Get Path
 */
AssetsFileSystem.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._options.get('cwd'));

    return _path.normalize(
        _path.join.apply(
            _path,
            args
        )
    );
};

/**
 * Has Path
 */
AssetsFileSystem.prototype.hasPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    return _fs.existsSync(
        this.getPath.apply(
            this,
            args
        )
    );
};

/**
 * Glob
 */
AssetsFileSystem.prototype.glob = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    return _glob.sync(
        _path.join.apply(
            _path,
            args
        ),
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
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._options.get('dest'));

    return this.getPath.apply(
        this,
        args
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
