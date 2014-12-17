/*global describe,it */

'use strict';

var
    assert     = require('assert'),
    AssetsPool = require('../lib/AssetsPool');

describe('AssetsPool', function() {
    var
        assetsPool = new AssetsPool('foo', 'bar');
    describe('#getName()', function() {
        it('should return name', function() {
            assert.equal('foo', assetsPool.getName());
        });
    });
    describe('#getPath()', function() {
        it('should return path', function() {
            assert.equal('bar', assetsPool.getPath());
        });
    });
});
