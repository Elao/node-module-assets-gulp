'use strict';


var
    assert = require('chai').assert,
    cwd = 'test/fixtures';

/***********/
/* Layouts */
/***********/

describe('Layouts', function() {

    // Bower
    describe('bower', function() {
        var
            assets = require('..')({
                cwd: cwd,
                silent: true
            });

        require('../layouts/bower')(assets);

        it('should find paths', function() {
            assert.deepEqual(
                assets.libraries.getPaths(), [
                    'test/fixtures/bower_components'
                ]
            );
        });
    });

    // Npm
    describe('npm', function() {
        var
            assets = require('..')({
                cwd: cwd,
                silent: true
            });

        require('../layouts/npm')(assets);

        it('should find paths', function() {
            assert.deepEqual(
                assets.libraries.getPaths(), [
                    'test/fixtures/node_modules'
                ]
            );
        });
    });

    // Assets
    describe('assets', function() {
        var
            assets = require('..')({
                cwd: cwd,
                silent: true
            });

        require('../layouts/assets')(assets);

        it('should find paths', function() {
            assert.deepEqual(
                assets.bundles.getPaths(), [
                    'test/fixtures/assets'
                ]
            );
        });

        describe('alternate path', function() {
            var
                assets = require('..')({
                    cwd: cwd,
                    silent: true
                });

            require('../layouts/assets')(assets, {
                path: 'assets_alt'
            });

            it('should find paths', function() {
                assert.deepEqual(
                    assets.bundles.getPaths(), [
                        'test/fixtures/assets_alt'
                    ]
                );
            });
        });
    });

    // Symfony
    describe('symfony', function() {
        var
            assets = require('..')({
                cwd: cwd,
                silent: true
            });

        require('../layouts/symfony')(assets);

        it('should find paths', function() {
            assert.deepEqual(
                assets.bundles.getPaths(), [
                    'test/fixtures/app/Resources/assets',
                    'test/fixtures/app/bar/Resources/assets',
                    'test/fixtures/app/foo/Resources/assets',
                    'test/fixtures/src/Bundle/BarBundle/Resources/assets',
                    'test/fixtures/src/FooBundle/Resources/assets'
                ]
            );
        });

        describe('alternate dir', function() {
            var
                assets = require('..')({
                    cwd: cwd,
                    silent: true
                });

            require('../layouts/symfony')(assets, {
                dir: 'assets_alt'
            });

            it('should find paths', function() {
                assert.deepEqual(
                    assets.bundles.getPaths(), [
                        'test/fixtures/app/Resources/assets_alt',
                        'test/fixtures/app/bar/Resources/assets_alt',
                        'test/fixtures/app/foo/Resources/assets_alt',
                        'test/fixtures/src/Bundle/BarBundle/Resources/assets_alt',
                        'test/fixtures/src/FooBundle/Resources/assets_alt'
                    ]
                );
            });
        });
    });

    // Components
    describe('components', function() {
        var
            assets = require('..')({
                cwd: cwd,
                silent: true
            });

        require('../layouts/assets')(assets);
        require('../layouts/symfony')(assets);
        require('../layouts/components')(assets);

        it('should find paths', function() {
            assert.deepEqual(
                assets.libraries.getPaths(), [
                    'test/fixtures/assets/components',
                    'test/fixtures/app/Resources/assets/components',
                    'test/fixtures/app/bar/Resources/assets/components',
                    'test/fixtures/src/FooBundle/Resources/assets/components'
                ]
            );
        });

        describe('alternate dir', function() {
            var
                assets = require('..')({
                    cwd: cwd,
                    silent: true
                });

            require('../layouts/assets')(assets);
            require('../layouts/symfony')(assets);
            require('../layouts/components')(assets, {
                dir: 'components_alt'
            });

            it('should find paths', function() {
                assert.deepEqual(
                    assets.libraries.getPaths(), [
                        'test/fixtures/assets/components_alt',
                        'test/fixtures/app/Resources/assets/components_alt',
                        'test/fixtures/app/bar/Resources/assets/components_alt',
                        'test/fixtures/src/FooBundle/Resources/assets/components_alt'
                    ]
                );
            });
        });
    });

});
