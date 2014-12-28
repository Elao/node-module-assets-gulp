'use strict';


var
    Library = require('./Library');


/**
 * Bundle Library
 */
function BundleLibrary(bundle, dir)
{
    this._bundle = bundle;
    this._dir = dir;
}


BundleLibrary.prototype = Object.create(Library.prototype);


/**
 * Get Path
 */
BundleLibrary.prototype.getPath = function()
{
    return this._bundle.getDirPath(this._dir);
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


module.exports = BundleLibrary;
