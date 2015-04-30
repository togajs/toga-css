/*eslint-env mocha */

import { parser } from '../index';
import expect from 'expect.js';

describe('toga-css spec', function () {
	describe('parser', function () {
		it('should return a transform stream', function () {
			var retval = parser();

			expect(retval.pipe).to.be.a(Function);
			expect(retval.readable).to.be(true);
			expect(retval.writable).to.be(true);
		});
	});
});
