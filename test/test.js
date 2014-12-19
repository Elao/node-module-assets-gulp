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
        pool = new AssetsPool('foo', 'bar', 'foobar'),
        poolUndescribed = new AssetsPool('foo', 'bar');

    describe('#id', function() {
        it('should return id', function() {
            assert.equal('foo', pool.id);
        });
    });
    describe('#path', function() {
        it('should return path', function() {
            assert.equal('bar', pool.path);
        });
    });
    describe('#description', function() {
        it('should return description', function() {
            assert.equal('foobar', pool.description);
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

/**************************/
/* Assets Components Pool */
/**************************/

var
    AssetsComponentsPool = require('../lib/AssetsComponentsPool');

describe('AssetsComponentsPool', function() {

    var
        pool = new AssetsComponentsPool('foo', 'bar', 'foobar'),
        poolUndescribed = new AssetsComponentsPool('foo', 'bar');

    describe('#id', function() {
        it('should return id', function() {
            assert.equal('foo', pool.id);
        });
    });
    describe('#path', function() {
        it('should return path', function() {
            assert.equal('bar', pool.path);
        });
    });
    describe('#description', function() {
        it('should return description', function() {
            assert.equal('foobar', pool.description);
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

/**********/
/* Assets */
/**********/

var
    Assets = require('../lib/Assets'),
    AssetsPoolPatternPathResolver = require('../lib/AssetsPoolPatternPathResolver'),
    AssetsPoolPatternGlobResolver = require('../lib/AssetsPoolPatternGlobResolver'),
    AssetsComponentsPoolPatternPathResolver = require('../lib/AssetsComponentsPoolPatternPathResolver'),
    AssetsComponentsPoolPatternPoolsResolver = require('../lib/AssetsComponentsPoolPatternPoolsResolver');

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
                .addPattern({
                    id:          'assets',
                    path:        'assets',
                    description: 'Common assets'
                })
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
                assets.pools.findPaths()
            );
        });
    });

    assets
        .componentsPools
            .addPatternResolver(new AssetsComponentsPoolPatternPathResolver(assets.path))
            .addPatternResolver(new AssetsComponentsPoolPatternPoolsResolver());

    describe('#componentPools', function() {

        // Pools patterns
        assets
            .componentsPools
                .addPattern({
                    id:          'bower',
                    path:        'bower_components',
                    description: 'Bower components'
                })
                .addPattern({
                    id:          'node',
                    path:        'node_modules',
                    description: 'Node modules'
                })
                .addPattern({
                    pools: assets.pools,
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
                assets.componentsPools.findPaths()
            );
        });
    });
});
