'use strict';


/**
 * Library
 */
function Library(fileSystem, path, description)
{
    this._fileSystem = fileSystem;

    this._path = path;
    this._description = typeof(description) !== 'undefined' ? description : null;
}


/**
 * Get Path
 */
Library.prototype.getPath = function()
{
    return this._fileSystem.getPath(
        this._path
    );
};

/**
 * Has Description
 */
Library.prototype.hasDescription = function()
{
    return this._description ? true : false;
};

/**
 * Get Description
 */
Library.prototype.getDescription = function()
{
    return this._description;
};


module.exports = Library;
