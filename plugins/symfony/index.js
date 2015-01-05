'use strict';


module.exports = function(assets, options)
{
    options = typeof(options) !== 'undefined' ? options : {};

    options = {
        dir: typeof(options.dir) !== 'undefined' ? options.dir : 'assets'
    };

    // Bundle patterns
    assets
        .addBundlePattern(
            function(bundle) {
                if (bundle.getPath().match(/^app\/Resources/)) {
                    return 'app';
                }
                return bundle.getPath()
                    .replace(/^app\//, '')
                    .replace(new RegExp('\/Resources\/' + options.dir + '(.*)$'), '')
                    .replace(/\//g, '') + 'App';
            },
            {
                glob: 'app/**/Resources/' + options.dir,
                description: 'Symfony app'
            }
        )
        .addBundlePattern(
            function(bundle) {
                return bundle.getPath()
                    .replace(/^src\//, '')
                    .replace(new RegExp('\/Resources\/' + options.dir + '(.*)$'), '')
                    .replace(/Bundle/g, '')
                    .replace(/\//g, '') + 'Bundle';
            },
            {
                glob: 'src/**/*Bundle/Resources/' + options.dir,
                description: 'Symfony bundle'
            }
        );
};
