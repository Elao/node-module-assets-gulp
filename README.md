# Elao - Assets - Gulp

Handle your project's assets with style ! (and gulp)


## Installation

    $ npm install


## Configuration

    var
        gulp             = require('gulp'),
        assets           = require('elao-assets-gulp')(),
        assetsList       = require('elao-assets-gulp/plugins/list')(assets),
        assetsClean      = require('elao-assets-gulp/plugins/clean')(assets),
        assetsFonts      = require('elao-assets-gulp/plugins/fonts')(assets, gulp),
        assetsImages     = require('elao-assets-gulp/plugins/images')(assets, gulp),
        assetsSass       = require('elao-assets-gulp/plugins/sass')(assets, gulp),
        assetsBrowserify = require('elao-assets-gulp/plugins/browserify')(assets, gulp);

    // Layouts
    require('elao-assets-gulp/layouts/bower')(assets);
    require('elao-assets-gulp/layouts/npm')(assets);
    require('elao-assets-gulp/layouts/components')(assets);
    require('elao-assets-gulp/layouts/assets')(assets);
    require('elao-assets-gulp/layouts/symfony')(assets);

    // Plugins
    gulp.task('list',   assetsList.task);
    gulp.task('clean',  assetsClean.task);

    gulp.task('install', ['fonts', 'images', 'sass', 'js']);
    gulp.task('fonts',  assetsFonts.task);
    gulp.task('images', assetsImages.task);
    gulp.task('sass',   assetsSass.task);
    gulp.task('js',     assetsBrowserify.task);

    gulp.task('watch', ['watch:sass', 'watch:js']);
    gulp.task('watch:sass', assetsSass.watch);
    gulp.task('watch:js',   assetsBrowserify.watch);

    gulp.task('default', ['install', 'watch'])

    assets
        .addPoolPattern('toto', {
            'fonts': {src: 'toto/**'}
        });


## Test

    $ npm test


## Todo

    * Use gulp header plugin when support sourcemaps (see: [https://github.com/tracker1/gulp-header/issues/7])
