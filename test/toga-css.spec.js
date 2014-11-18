'use strict';

var css = require('../index'),
	expect = require('expect.js');

describe('toga-css spec', function () {
	describe('parser', function () {
		it('should return a transform stream', function () {
			var retval = css.parser();

			expect(retval.pipe).to.be.a(Function);
			expect(retval.readable).to.be(true);
			expect(retval.writable).to.be(true);
		});
	});
});
