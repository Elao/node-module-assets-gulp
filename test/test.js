'use strict';

var
    assert = require('assert');
    
/***************/
/* Assets Pool */
/***************/

var
    AssetsPool = require('../lib/AssetsPool');

describe('AssetsPool', function() {
    var
        assetsPool = new AssetsPool('foo', 'bar', 'foobar');
    describe('#getId()', function() {
        it('should return id', function() {
            assert.equal('foo', assetsPool.getId());
        });
    });
    describe('#getPath()', function() {
        it('should return path', function() {
            assert.equal('bar', assetsPool.getPath());
        });
    });
    describe('#getDescription()', function() {
        it('should return description', function() {
            assert.equal('foobar', assetsPool.getDescription());
        });
    });
});
