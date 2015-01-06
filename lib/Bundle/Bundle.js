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
    return this._fileSystem.getPath(
        this._path
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
 * Get Dir Path
 */
Bundle.prototype.getDirPath = function(dir)
{
    return this._fileSystem.getPath(
        this._fileSystem.join(
            this._path,
            dir
        )
    );
};


module.exports = Bundle;
