'use strict';


var
    assert = require('chai').assert,
    fs = require('fs'),
    cwd = 'test/fixtures';

/***********/
/* Plugins */
/***********/

describe('Plugins', function() {

    // Clean
    describe('clean', function() {
        var
            dir = cwd + '/web/assets',
            assets = require('..')({
                cwd: cwd,
                silent: true
            });

        before(function() {
            // Create assets test dest structure
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFileSync(dir + '/_test', 'test');
            if (!fs.existsSync(dir + '/test')) {
                fs.mkdirSync(dir + '/test');
            }
            fs.writeFileSync(dir + '/test/_test', 'test');
        });

        it('should run without errors', function(done) {
            require('../plugins/clean')(assets).task(done);
        });

        it('should have cleaned dest path', function() {
            assert.deepEqual(
                fs.readdirSync(dir),
                []
            );
        });
    });

    // Fonts
    describe('fonts', function() {
        var
            gulp   = require('gulp'),
            assets = require('..')({
                cwd: cwd,
                silent: true
            });

        require('../layouts/npm')(assets);
        require('../layouts/bower')(assets);
        require('../layouts/assets')(assets);
        require('../layouts/symfony')(assets);
        require('../layouts/components')(assets);

        require('../plugins/fonts')(assets, gulp).task();

        after(function(done) {
            require('../plugins/clean')(assets).task(done);
        });

        it('should have handled assets', function() {
            assert.deepEqual(
                fs.readdirSync(assets.getPoolHandler('fonts').getDestPath()), [
                    'a.ttf',
                    'foo',
                    'z.ttf'
                ]
            );
            assert.deepEqual(
                fs.readdirSync(assets.getPoolHandler('fonts').getDestPath('foo')), [
                    'a.ttf',
                    'z.ttf'
                ]
            );
        });

        describe('no assets', function() {
            var
                assets = require('..')({
                    cwd: cwd,
                    silent: true
                });

            it('should return null', function() {
                assert.isNull(
                    require('../plugins/fonts')(assets, gulp).task()
                );
            });
        });
    });

});
