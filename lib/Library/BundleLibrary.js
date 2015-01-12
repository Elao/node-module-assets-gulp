'use strict';


var
    Library = require('./Library');


/**
 * Bundle Library
 */
function BundleLibrary(fileSystem, bundle, dir)
{
    this._bundle = bundle;
    this._dir = dir;

    Library.call(this, fileSystem);
}


BundleLibrary.prototype = Object.create(Library.prototype);


/**
 * Get Path
 */
BundleLibrary.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._dir);

    return this._bundle.getPath.apply(
        this._bundle,
        args
    );
};

/**
 * Has Description
 */
BundleLibrary.prototype.hasDescription = function()
{
    return this._bundle.hasDescription();
};

/**
 * Get Description
 */
BundleLibrary.prototype.getDescription = function()
{
    return this._bundle.getDescription();
};

/**
 * Glob
 */
BundleLibrary.prototype.glob = function(glob)
{
    return this._bundle.glob(
        this._fileSystem.join(this._dir, glob)
    );
};


module.exports = BundleLibrary;
