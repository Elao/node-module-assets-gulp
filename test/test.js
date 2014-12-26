'use strict';

var
    assert = require('chai').assert;

/*****************/
/* Assets Bundle */
/*****************/

var
    AssetsBundle = require('../lib/AssetsBundle');

describe('AssetsBundle', function()
{
    var
        bundle = new AssetsBundle('foo', 'bar', 'foobar'),
        bundleUndescribed = new AssetsBundle('foo', 'bar');

    describe('#id', function() {
        it('should return id', function() {
            assert.equal('foo', bundle.id);
        });
    });
    describe('#path', function() {
        it('should return path', function() {
            assert.equal('bar', bundle.path);
        });
    });
    describe('#description', function() {
        it('should return description', function() {
            assert.equal('foobar', bundle.description);
        });
    });
    describe('#hasDescription()', function() {
        it('should return true', function() {
            assert(bundle.hasDescription());
        });
    });
    describe('#hasDescription()', function() {
        it('should return false', function() {
            assert(!bundleUndescribed.hasDescription());
        });
    });
});

/******************/
/* Assets Library */
/******************/

var
    AssetsLibrary = require('../lib/AssetsLibrary');

describe('AssetsLibrary', function()
{
    var
        library = new AssetsLibrary('foo', 'bar'),
        libraryUndescribed = new AssetsLibrary('foo');

    describe('#path', function() {
        it('should return path', function() {
            assert.equal('foo', library.path);
        });
    });
    describe('#description', function() {
        it('should return description', function() {
            assert.equal('bar', library.description);
        });
    });
    describe('#hasDescription()', function() {
        it('should return true', function() {
            assert(library.hasDescription());
        });
    });
    describe('#hasDescription()', function() {
        it('should return false', function() {
            assert(!libraryUndescribed.hasDescription());
        });
    });
});

/**********/
/* Assets */
/**********/

var
    Assets = require('../lib/Assets'),
    AssetsBundlePatternPathResolver = require('../lib/AssetsBundlePatternPathResolver'),
    AssetsBundlePatternGlobResolver = require('../lib/AssetsBundlePatternGlobResolver'),
    AssetsLibraryPatternPathResolver = require('../lib/AssetsLibraryPatternPathResolver'),
    AssetsLibraryPatternBundlesResolver = require('../lib/AssetsLibraryPatternBundlesResolver');

describe('Assets', function()
{
    var
        assets = new Assets('test/fixtures');

    // Bundles pattern resvolvers
    assets
        .addBundlePatternResolver(new AssetsBundlePatternPathResolver(assets.path))
        .addBundlePatternResolver(new AssetsBundlePatternGlobResolver(assets.path));

    describe('#bundles', function() {

        // Bundles patterns
        assets
            .addBundlePattern('assets', {
                path:        'assets',
                description: 'Common assets'
            })
            .addBundlePattern(
                function(path) {
                    if (path.match(/^app\/Resources/)) {
                        return 'app';
                    }
                    return path
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
                function(path) {
                    return path
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


        it('should find bundles', function() {
            assert.deepEqual(
                [
                    'test/fixtures/assets',
                    'test/fixtures/app/Resources/assets',
                    'test/fixtures/app/bar/Resources/assets',
                    'test/fixtures/app/foo/Resources/assets',
                    'test/fixtures/src/Bundle/BarBundle/Resources/assets',
                    'test/fixtures/src/FooBundle/Resources/assets'
                ],
                assets.bundles.paths()
            );
        });
    });

    assets
        .addLibraryPatternResolver(new AssetsLibraryPatternPathResolver(assets.path))
        .addLibraryPatternResolver(new AssetsLibraryPatternBundlesResolver(assets.bundles));

    describe('#libraries', function() {

        // Libraries patterns
        assets
            .addLibraryPattern({
                path:        'bower_components',
                description: 'Bower components'
            })
            .addLibraryPattern({
                path:        'node_modules',
                description: 'Node modules'
            })
            .addLibraryPattern({
                dir: 'components'
            });


        it('should find bundles', function() {
            assert.deepEqual(
                [
                    'test/fixtures/bower_components',
                    'test/fixtures/node_modules',
                    'test/fixtures/assets/components',
                    'test/fixtures/app/Resources/assets/components',
                    'test/fixtures/app/bar/Resources/assets/components',
                    'test/fixtures/src/FooBundle/Resources/assets/components'
                ],
                assets.libraries.paths()
            );
        });
    });
});
