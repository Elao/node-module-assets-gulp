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
        
        before(function() {
            // Create assets dir
            if (!fs.existsSync('test/fixtures/web/assets')) {
                fs.mkdirSync('test/fixtures/web/assets');
            }

            // Create test files & dir
            if (!fs.existsSync('test/fixtures/web/assets/test')) {
                fs.mkdirSync('test/fixtures/web/assets/test');
            }
            fs.writeFileSync('test/fixtures/web/assets/_test', 'test');
            fs.writeFileSync('test/fixtures/web/assets/test/_test', 'test');
        });
        
        it('should run without errors', function(done) {
            var
                assets = require('..')({cwd: 'test/fixtures'});

            require('../plugins/clean')(assets)['task'](done);
        });

        it('should have cleaned dest path', function(done) {
            assert.deepEqual(['_test', 'test'], fs.readdirSync('test/fixtures/web/assets'));
            assert.deepEqual(['_test'], fs.readdirSync('test/fixtures/web/assets/test'));
            done();
        });
    });
});
