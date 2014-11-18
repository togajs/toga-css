'use strict';

var css = require('../index'),
	es = require('event-stream'),
	expect = require('expect.js'),
	fs = require('fs'),
	toga = require('toga'),

	config = {
		css: __dirname + '/fixtures/**/*.css',
		less: __dirname + '/fixtures/**/*.less',
		scss: __dirname + '/fixtures/**/*.scss',
		txt: __dirname + '/fixtures/**/*.txt',
		dest: __dirname + '/actual'
	};

describe('toga-css e2e', function () {
	var count;

	function toEqualExpected(file, cb) {
		count++;

		var expected = file.path.replace('fixtures', 'expected') + '.json';
		expect(JSON.stringify(file.ast, null, 4) + '\n').to.be(fs.readFileSync(expected, 'utf8'));
		cb(null, file);
	}

	function toEqualUndefined(file, cb) {
		count++;

		expect(file.toga).to.be(undefined);
		cb(null, file);
	}

	it('should parse css files', function (done) {
		count = 0;

		toga
			.src(config.css)
			.pipe(css.parser())
			.pipe(es.map(toEqualExpected))
			.pipe(toga.dest(config.dest))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(8);
				done();
			});
	});

	it('should not parse empty files', function (done) {
		count = 0;

		var files = [
			{ path: 'foo.css' },
			{ path: 'foo.css', content: null },
			undefined
		];

		es
			.readArray(files)
			.pipe(css.parser())
			.pipe(es.map(toEqualUndefined))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(2);
				done();
			});
	});

	it('should not parse unknown file types', function (done) {
		count = 0;

		toga
			.src(config.txt)
			.pipe(css.parser())
			.pipe(es.map(toEqualUndefined))
			.pipe(toga.dest(config.dest))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(0);
				done();
			});
	});
});
