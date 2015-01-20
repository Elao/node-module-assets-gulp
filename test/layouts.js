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
                assets.libraries.getPaths(),
                ['test/fixtures/bower_components']
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
                assets.libraries.getPaths(),
                ['test/fixtures/node_modules']
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
                assets.bundles.getPaths(),
                ['test/fixtures/assets']
            );
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
                assets.bundles.getPaths(),
                [
                    'test/fixtures/app/Resources/assets',
                    'test/fixtures/app/bar/Resources/assets',
                    'test/fixtures/app/foo/Resources/assets',
                    'test/fixtures/src/Bundle/BarBundle/Resources/assets',
                    'test/fixtures/src/FooBundle/Resources/assets'
                ]
            );
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
                assets.libraries.getPaths(),
                [
                    'test/fixtures/assets/components',
                    'test/fixtures/app/Resources/assets/components',
                    'test/fixtures/app/bar/Resources/assets/components',
                    'test/fixtures/src/FooBundle/Resources/assets/components'
                ]
            );
        });
    });

});
