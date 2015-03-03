# Elao - Assets - Gulp

Handle your project's assets with style ! (and gulp)


## Installation

    $ npm install


## Configuration

    var
        gulp   = require('gulp'),
        assets = require('elao-assets-gulp')();

    // Assets - Layouts
    assets
        .addLayout('bower')
        .addLayout('npm')
        .addLayout('components')
        .addLayout('assets')
        .addLayout('symfony');

    // Assets - Plugins
    assets
        .addPlugin('list')
        .addPlugin('clean')
        .addPlugin('fonts', 'files', {dir: 'fonts'})
        .addPlugin('images')
        .addPlugin('sass')
        .addPlugin('browserify');

    // Assets - Pools
    assets
        .addPoolPattern('toto', {
            'fonts': {src: 'toto/**'}
        });

    // Gulp - Tasks
    gulp.task('list',   assets.plugins.list.gulpTask);
    gulp.task('clean',  assets.plugins.clean.gulpTask);

    gulp.task('install', ['fonts', 'images', 'sass', 'js']);
    gulp.task('fonts',  assets.plugins.fonts.gulpTask);
    gulp.task('images', assets.plugins.images.gulpTask);
    gulp.task('sass',   assets.plugins.sass.gulpTask);
    gulp.task('js',     assets.plugins.browserify.gulpTask);

    gulp.task('watch', ['watch:sass', 'watch:js']);
    gulp.task('watch:sass', assets.plugins.sass.gulpWatch);
    gulp.task('watch:js',   assets.plugins.browserify.gulpWatch);

    gulp.task('default', ['install', 'watch']);


## Test

    $ npm test


## Todo

    * Use gulp header plugin when support sourcemaps (see: [https://github.com/tracker1/gulp-header/issues/7])
