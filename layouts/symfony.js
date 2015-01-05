'use strict';

module.exports = function(gulp, options)
{
    var
        assets = require('./')(gulp, options),
        bundleDir = assets.options.get('bundleDir');

    // Bundle patterns
    assets
        .addBundlePattern(
            function(bundle) {
                if (bundle.getPath().match(/^app\/Resources/)) {
                    return 'app';
                }
                return bundle.getPath()
                    .replace(/^app\//, '')
                    .replace(new RegExp('\/Resources\/' + bundleDir + '(.*)$'), '')
                    .replace(/\//g, '') + 'App';
            },
            {
                glob: 'app/**/Resources/' + bundleDir,
                description: 'Symfony app'
            }
        )
        .addBundlePattern(
            function(bundle) {
                return bundle.getPath()
                    .replace(/^src\//, '')
                    .replace(new RegExp('\/Resources\/' + bundleDir + '(.*)$'), '')
                    .replace(/Bundle/g, '')
                    .replace(/\//g, '') + 'Bundle';
            },
            {
                glob: 'src/**/*Bundle/Resources/' + bundleDir,
                description: 'Symfony bundle'
            }
        );

    return assets;
};
