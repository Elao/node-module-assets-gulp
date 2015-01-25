# Elao - Assets - Gulp

Handle your project's assets with style ! (and gulp)


## Installation

    $ npm install


## Configuration

    var
        gulp   = require('gulp'),
        assets = require('elao-assets-gulp')();

    // Layouts
    require('elao-assets-gulp/layouts/bower')(assets);
    require('elao-assets-gulp/layouts/npm')(assets);
    require('elao-assets-gulp/layouts/components')(assets);
    require('elao-assets-gulp/layouts/assets')(assets);
    require('elao-assets-gulp/layouts/symfony')(assets);

    // Plugins
    gulp.task('list',   require('elao-assets-gulp/plugins/list')(assets).task);
    gulp.task('clean',  require('elao-assets-gulp/plugins/clean')(assets).task);
    gulp.task('images', require('elao-assets-gulp/plugins/images')(assets, gulp).task);
    gulp.task('fonts',  require('elao-assets-gulp/plugins/fonts')(assets, gulp).task);


## Test

    $ npm test

## Todo

    * Use gulp header plugin when support sourcemaps (see: [https://github.com/tracker1/gulp-header/issues/7])
