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

La partie javascript est géré par [browserify](http://browserify.org/). Tout les fichiers javascript qui ne commence pas par un underscore et qui ce trouve dans un dossier `assets/js` sont envoyé a browserify pour qu'il les convertisse

On peut configurer la manière dont sont gérer les fichiers par browserify au niveau de la configuration de notre plugin

    assets: {
        js: {
            bundles: {
                'main.js'  : {require: 'jquery'},
                'video.js' : {external: 'jquery'},
                'upload.js': {external: 'jquery'},
                'search.js': {external: 'jquery'}
            }
        },
        
La ligne avec `require: 'jquery'` indique que c'est le fichier qui aura jquery, alors que les ligne `external: 'jquery'` indique que nous aurons besoin de charger un autre fichier javascript qui lui contiendra jquery

### Sass

Prend tout les fichiers dans assets/sass qui ne commence pas par _ et les transforme en css

### Images

Déplacer toute les images, et éxecute un imagemin sur celle-ci si l'on n'a pas lancé gulp en mode dev

### Files

Permet de déplacer n'importe quel type de fichiers, dans cette exemple nous déplaçons les fonts de bootstrap dans le dossier web/assets/fonts

    files: {
        groups: {
            'bootstrap/fonts': {src: 'bootstrap-sass/assets/fonts/bootstrap/*', dest: 'fonts'}
        }
    }

On peut également concatener plusieurs fichiers ensenble, cette ligne va prendre les fichier qui ce trouve dans le dossier `vendor/css`, les déplacer dans `web/assets/css/vendor` et créer un seul fichier `main.css`

    files: {
        groups: {
            'machin/css': {src: 'vendor/css/*', dest: 'css/vendor', concat: 'main.css'},
        }
    }


## Configuration avancée
