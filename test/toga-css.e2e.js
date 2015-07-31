/* eslint-env mocha */

import { parser } from '../src/toga-css';
import expect from 'expect';
import toga from 'toga';
import { join } from 'path';
import { readFileSync } from 'fs';

	var config = {
		fixtures: join(__dirname, 'fixtures'),
		expected: join(__dirname, 'expected'),
		actual: join(__dirname, 'actual')
	};

describe('toga-css e2e', function () {
	describe('object streams', function () {
		function testWithFile(filename, stream, done) {
			var fixture = join(config.fixtures, filename),
				expected = join(config.expected, filename + '.json');

			function expectFile(file) {
				var actual = JSON.stringify(file.docAst, null, 2) + '\n';

				expect(actual).toEqual(String(readFileSync(expected)));
				// file.contents = new Buffer(actual);
			}

			toga
				.src(fixture)
				.pipe(stream)
				.on('data', expectFile)
				// .pipe(toga.dest(config.actual))
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
				expect(file.docAst).toBe(undefined);
			}

			toga
				.src(join(config.fixtures, 'unused.coffee'))
				.pipe(parser())
				.on('data', expectFile)
				.on('error', done)
				.on('end', done);
		});
	});
});
