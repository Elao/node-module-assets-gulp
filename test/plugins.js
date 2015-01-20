'use strict';


var
    assert = require('chai').assert,
    fs = require('fs');

/***********/
/* Plugins */
/***********/

describe('Plugins', function() {

    // Clean
    describe('clean', function() {

        var
            cwd = 'test/fixtures',
            dir = cwd + '/web/assets';

        before(function(done) {
            var
                assets = require('..')({
                    cwd: cwd,
                    silent: true
                });

            // Create assets test dest structure
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            if (!fs.existsSync(dir + '/test')) {
                fs.mkdirSync(dir + '/test');
            }
            fs.writeFileSync(dir + '/_test', 'test');
            fs.writeFileSync(dir + '/test/_test', 'test');

            // Run clean task
            require('../plugins/clean')(assets).task(done);
        });

        it('should have cleaned dest path', function() {
            assert.deepEqual([], fs.readdirSync(dir));
        });
    });
});
