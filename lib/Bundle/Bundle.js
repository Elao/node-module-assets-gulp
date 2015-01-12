'use strict';


/**
 * Bundle
 */
function Bundle(fileSystem, id, path, description)
{
    this._fileSystem = fileSystem;

    this._id = id;
    this._path = path;
    this._description = typeof(description) !== 'undefined' ? description : null;
}


/**
 * Get Id
 */
Bundle.prototype.getId = function()
{
    return typeof(this._id) === 'function' ? this._id(this) : this._id;
};

/**
 * Get Path
 */
Bundle.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._path);

    return this._fileSystem.getPath.apply(
        this._fileSystem,
        args
    );
};

/**
 * Has Description
 */
Bundle.prototype.hasDescription = function()
{
    return this._description ? true : false;
};

/**
 * Get Description
 */
Bundle.prototype.getDescription = function()
{
    return this._description;
};

/**
 * Has Dir
 */
Bundle.prototype.hasDir = function(dir)
{
    return this._fileSystem.hasPath(
        this._fileSystem.join(
            this._path,
            dir
        )
    );
};

/**
 * Glob
 */
Bundle.prototype.glob = function(glob)
{
    return this._fileSystem.glob(
        this._fileSystem.join(this._path, glob)
    );
};


module.exports = Bundle;
