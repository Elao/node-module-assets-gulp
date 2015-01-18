'use strict';


var
    assert = require('chai').assert,
    fs = require('fs');

/*********/
/* Clean */
/*********/

describe('clean', function() {

    it('should report a filled dest path', function(done) {
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

        assert.deepEqual(['_test', 'test'], fs.readdirSync('test/fixtures/web/assets'));
        assert.deepEqual(['_test'], fs.readdirSync('test/fixtures/web/assets/test'));
        done();
    });

    it('should report an empty dest path', function(done) {
        var
            gulp   = require('gulp'),
            assets = require('..')(gulp, {cwd: 'test/fixtures'});

        require('../plugins/clean')(assets, gulp);

        console.log(assets);

        assert.deepEqual([], fs.readdirSync('test/fixtures/web/assets'));
        done();
    });
});
