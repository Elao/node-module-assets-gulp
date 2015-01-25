'use strict';


/**
 * Library
 */
function Library(fileSystem, path, description)
{
    this._fileSystem = fileSystem;

    this._path = path;
    this._description = description || null;
}


/**
 * Get Path
 */
Library.prototype.getPath = function()
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
 * Glob
 */
Library.prototype.glob = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._path);

    return this._fileSystem.glob.apply(
        this._fileSystem,
        args
    );
};

/**
 * Glob Match
 */
Library.prototype.globMatch = function(glob)
{
    return this.glob(glob).length ? true : false;
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
