'use strict';


var
    Handler = require('../../lib/Handler/Handler'),
    BundlePoolPatternSolver = require('../../lib/Handler/Pool/BundlePoolPatternSolver');


module.exports = function(assets, gulp)
{
    var
        handler = new Handler('images', 'Handles images assets');

    // Pools patterns solvers
    handler
        .addPoolPatternSolver(new BundlePoolPatternSolver(assets.bundles, assets.fileSystem))
        .addPoolPattern({
            dir:  'images',
            glob: '**'
        });

    assets
        .addHandler(handler);

    // Images
    gulp.task('images', function(callback) {
        callback();
    });

};
