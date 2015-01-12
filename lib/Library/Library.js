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

/**
 * Glob
 */
Library.prototype.glob = function(glob)
{
    return this._fileSystem.glob(
        this._fileSystem.join(this._path, glob)
    );
};

/**
 * Glob Match
 */
Library.prototype.globMatch = function(glob)
{
    return this.glob(glob).length ? true : false;
};


module.exports = Library;
