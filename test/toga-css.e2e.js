/*eslint-env mocha */

import { parser } from '../index';
import expect from 'expect';
import streamArray from 'stream-array';
import vinylFs from 'vinyl-fs';
import { join } from 'path';
import { readFileSync } from 'fs';

var config = {
	fixtures: join(__dirname, '/fixtures'),
	expected: join(__dirname, '/expected'),
	actual: join(__dirname, '/actual')
};

describe('toga-css e2e', function () {
	describe('raw streams', function () {
		function testWithArray(array, stream, done) {
			function expectChunk(chunk) {
				expect(chunk).toEqual({
					type: 'Document',
					blocks: [{
						contents: 'hello',
						type: 'Code'
					}]
				});
			}

			streamArray(array)
				.pipe(stream)
				.on('data', expectChunk)
				.on('error', done)
				.on('end', done);
		}

		it('should parse strings', function (done) {
			var strings = ['hello', 'hello'];

			testWithArray(strings, parser(), done);
		});

		it('should parse buffers', function (done) {
			var buffers = [new Buffer('hello'), new Buffer('hello')];

			testWithArray(buffers, parser(), done);
		});
	});

	describe('object streams', function () {
		function testWithFile(filename, stream, done) {
			var fixture = join(config.fixtures, filename),
				expected = join(config.expected, filename + '.json');

			function expectFile(file) {
				var actual = JSON.stringify(file.ast, null, 2) + '\n';

				expect(actual).toEqual(String(readFileSync(expected)));
			}

			vinylFs
				.src(fixture)
				.pipe(stream)
				.on('data', expectFile)
				.on('error', done)
				.on('end', done);
		}

		it('should parse css', function (done) {
			testWithFile('tags.css', parser(), done);
		});

		it('should parse less', function (done) {
			testWithFile('tags.less', parser(), done);
		});

		it('should parse scss', function (done) {
			testWithFile('tags.scss', parser(), done);
		});

		it('should ignore unknown files', function (done) {
			function expectFile(file) {
				expect(file.ast).toBe(undefined);
			}

			vinylFs
				.src(join(config.fixtures, 'unused.coffee'))
				.pipe(parser())
				.on('data', expectFile)
				.on('error', done)
				.on('end', done);
		});
	});
});
