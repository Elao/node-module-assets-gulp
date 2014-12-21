'use strict';

module.exports = function(gulp, path) {

    var
        assets = require('./')(gulp, path);

    // Symfony assets pools patterns
    assets
        .pools
            .addPattern({
                id: function(path) {
                    if (path.match(/^app\/Resources/)) {
                        return 'app';
                    }
                    return path
                        .replace(/^app\//, '')
                        .replace(/\/Resources\/assets(.*)$/, '')
                        .replace(/\//g, '') + 'App';
                },
                glob: 'app/**/Resources/assets',
                description: 'Symfony app'
            })
            .addPattern({
                id: function(path) {
                    return path
                        .replace(/^src\//, '')
                        .replace(/\/Resources\/assets(.*)$/, '')
                        .replace(/Bundle/g, '')
                        .replace(/\//g, '') + 'Bundle';
                },
                glob: 'src/**/*Bundle/Resources/assets',
                description: 'Symfony bundle'
            });

    return assets;
};
