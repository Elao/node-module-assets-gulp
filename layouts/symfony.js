'use strict';

module.exports = function(gulp, options)
{
    var
        assets = require('./')(gulp, options);

    // Bundle patterns
    assets
        .addBundlePattern(
            function(bundle) {
                if (bundle.getPath().match(/^app\/Resources/)) {
                    return 'app';
                }
                return bundle.getPath()
                    .replace(/^app\//, '')
                    .replace(/\/Resources\/assets(.*)$/, '')
                    .replace(/\//g, '') + 'App';
            },
            {
                glob: 'app/**/Resources/assets',
                description: 'Symfony app'
            }
        )
        .addBundlePattern(
            function(bundle) {
                return bundle.getPath()
                    .replace(/^src\//, '')
                    .replace(/\/Resources\/assets(.*)$/, '')
                    .replace(/Bundle/g, '')
                    .replace(/\//g, '') + 'Bundle';
            },
            {
                glob: 'src/**/*Bundle/Resources/assets',
                description: 'Symfony bundle'
            }
        );

    return assets;
};
