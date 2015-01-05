'use strict';


var
    assert = require('chai').assert;


/**********/
/* Bundle */
/**********/

var
    Bundle = require('../lib/Bundle/Bundle');

describe('Bundle', function()
{
    var
        bundle = new Bundle(null, 'foo', 'bar', 'foobar'),
        bundleUndescribed = new Bundle(null, 'foo', 'bar');

    describe('#getId()', function() {
        it('should return id', function() {
            assert.equal(bundle.getId(), 'foo');
        });
    });
    describe('#getPath()', function() {
        it('should return path', function() {
            assert.equal(bundle.getPath(), 'bar');
        });
    });
    describe('#getDescription()', function() {
        it('should return description', function() {
            assert.equal(bundle.getDescription(), 'foobar');
        });
    });
    describe('#hasDescription()', function() {
        it('should return true', function() {
            assert.isTrue(bundle.hasDescription());
        });
    });
    describe('#hasDescription()', function() {
        it('should return false', function() {
            assert.isFalse(bundleUndescribed.hasDescription());
        });
    });
});


/***********/
/* Library */
/***********/

var
    Library = require('../lib/Library/Library');

describe('Library', function()
{
    var
        library = new Library('foo', 'bar'),
        libraryUndescribed = new Library('foo');

    describe('#getPath()', function() {
        it('should return path', function() {
            assert.equal(library.getPath(), 'foo');
        });
    });
    describe('#getDescription()', function() {
        it('should return description', function() {
            assert.equal(library.getDescription(), 'bar');
        });
    });
    describe('#hasDescription()', function() {
        it('should return true', function() {
            assert.isTrue(library.hasDescription());
        });
    });
    describe('#hasDescription()', function() {
        it('should return false', function() {
            assert.isFalse(libraryUndescribed.hasDescription());
        });
    });
});


/**********/
/* Assets */
/**********/

var
    Assets = require('../lib/Assets'),
    BundlePatternSolver = require('../lib/Bundle/BundlePatternSolver'),
    GlobBundlePatternSolver = require('../lib/Bundle/GlobBundlePatternSolver'),
    LibraryPatternSolver = require('../lib/Library/LibraryPatternSolver'),
    BundleLibraryPatternSolver = require('../lib/Library/BundleLibraryPatternSolver');

describe('Assets', function()
{
    var
        assets = new Assets({cwd: 'test/fixtures'});

    // Bundle pattern solvers
    assets
        .addBundlePatternSolver(new BundlePatternSolver(assets.fileSystem))
        .addBundlePatternSolver(new GlobBundlePatternSolver(assets.fileSystem));

    describe('#bundles', function() {

        // Bundle patterns
        assets
            .addBundlePattern('assets', {
                path:        'assets',
                description: 'Common assets'
            })
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


        it('should find bundles', function() {
            assert.deepEqual(
                assets.bundles.getPaths(),
                [
                    'test/fixtures/assets',
                    'test/fixtures/app/Resources/assets',
                    'test/fixtures/app/bar/Resources/assets',
                    'test/fixtures/app/foo/Resources/assets',
                    'test/fixtures/src/Bundle/BarBundle/Resources/assets',
                    'test/fixtures/src/FooBundle/Resources/assets'
                ]
            );
        });
    });

    // Library pattern solvers

    assets
        .addLibraryPatternSolver(new LibraryPatternSolver(assets.fileSystem))
        .addLibraryPatternSolver(new BundleLibraryPatternSolver(assets.bundles));

    describe('#libraries', function() {

        // Library patterns
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


        it('should find libraries', function() {
            assert.deepEqual(
                assets.libraries.getPaths(),
                [
                    'test/fixtures/bower_components',
                    'test/fixtures/node_modules',
                    'test/fixtures/assets/components',
                    'test/fixtures/app/Resources/assets/components',
                    'test/fixtures/app/bar/Resources/assets/components',
                    'test/fixtures/src/FooBundle/Resources/assets/components'
                ]
            );
        });
    });
});
