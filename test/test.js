'use strict';

var
    assert = require('chai').assert;

/***************/
/* Assets Pool */
/***************/

var
    AssetsPool = require('../lib/AssetsPool');

describe('AssetsPool', function() {

    var
        pool = new AssetsPool('foo', 'bar'),
        poolUndescribed = new AssetsPool('foo');

    describe('#path', function() {
        it('should return path', function() {
            assert.equal('foo', pool.path);
        });
    });
    describe('#description', function() {
        it('should return description', function() {
            assert.equal('bar', pool.description);
        });
    });
    describe('#hasDescription()', function() {
        it('should return true', function() {
            assert(pool.hasDescription());
        });
    });
    describe('#hasDescription()', function() {
        it('should return false', function() {
            assert(!poolUndescribed.hasDescription());
        });
    });
});

/******************/
/* Assets Library */
/******************/

var
    AssetsLibrary = require('../lib/AssetsLibrary');

describe('AssetsLibrary', function() {

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
    AssetsPoolPatternPathResolver = require('../lib/AssetsPoolPatternPathResolver'),
    AssetsPoolPatternGlobResolver = require('../lib/AssetsPoolPatternGlobResolver'),
    AssetsLibraryPatternPathResolver = require('../lib/AssetsLibraryPatternPathResolver'),
    AssetsLibraryPatternPoolsResolver = require('../lib/AssetsLibraryPatternPoolsResolver');

describe('Assets', function() {

    var
        assets = new Assets('test/fixtures');

    // Pools pattern resvolvers
    assets
        .pools
            .addPatternResolver(new AssetsPoolPatternPathResolver(assets.path))
            .addPatternResolver(new AssetsPoolPatternGlobResolver(assets.path));

    describe('#pools', function() {

        // Pools patterns
        assets
            .pools
                .addPattern('assets', {
                    path:        'assets',
                    description: 'Common assets'
                })
                .addPattern(
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
                .addPattern(
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


        it('should find pools', function() {
            assert.deepEqual(
                [
                    'test/fixtures/assets',
                    'test/fixtures/app/Resources/assets',
                    'test/fixtures/app/bar/Resources/assets',
                    'test/fixtures/app/foo/Resources/assets',
                    'test/fixtures/src/Bundle/BarBundle/Resources/assets',
                    'test/fixtures/src/FooBundle/Resources/assets'
                ],
                assets.pools.paths()
            );
        });
    });

    assets
        .libraries
            .addPatternResolver(new AssetsLibraryPatternPathResolver(assets.path))
            .addPatternResolver(new AssetsLibraryPatternPoolsResolver(assets.pools));

    describe('#libraries', function() {

        // Libraries patterns
        assets
            .libraries
                .addPattern('bower', {
                    path:        'bower_components',
                    description: 'Bower components'
                })
                .addPattern('node', {
                    path:        'node_modules',
                    description: 'Node modules'
                })
                .addPattern({
                    dir: 'components'
                });


        it('should find pools', function() {
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
