# Elao - Assets - Gulp

Handle your project's assets with style ! (and gulp)

## A quoi sert ce plugin ?
Ce plugin gulp défini un ensemble de tasks permettant de gérer l'intégralité des assets (sass, javascript, images et autres fichiers) sur nos projets Symfony (ou silex), en suivant nos conventions

### Conventions
Sur nos projets Symfony, nos assets ce situe dans les dossiers `app/Resources/assets` ou au niveau du dossier `Resources/assets` de chacun des bundles du projets. (pour nos projet silex nous avons un dossier `assets` a la racine du projet).

## Installation

    # Installation de gulp
    npm install -g gulp
    npm install --save-dev gulp
    
    # Installation du plugin
    npm install --save-dev elao-assets-gulp

Configuration des tâches par défaut (au niveau du fichier `gulpfile.js`)

    var
        gulp   = require('gulp'),
        del    = require('del'),
        assets = require('elao-assets-gulp');

    /*********/
    /* Tasks */
    /*********/

    gulp.task('default', ['install', 'watch']);
    gulp.task('install', ['js', 'sass', 'images', 'files']);
    gulp.task('watch',   ['watch:js', 'watch:sass', 'watch:images']);
    gulp.task('lint',    ['lint:js', 'lint:sass']);
    gulp.task('clean',   function(cb) {
        del(assets.getDest() + '/*', cb);
    });


### Javascripts
### Sass
### Images
### Files

## Configuration avancée
