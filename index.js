'use strict';

/**
 * # Toga CSS Parser
 *
 * Generates an abstract syntax tree based on a customizable regular-expression
 * grammar for use in the Toga eco-system. Tags are parsed greedily. If it looks
 * like a tag, it's a tag.
 *
 * Supports generating documentation for:
 *
 * - css
 * - less
 * - scss
 */

var tunic = require('tunic'),
	mixin = require('mtil/object/mixin'),

	/** Default options. */
	defaults = {
		extension: /.(css|less|scss)$/,
		namedTags: [
			'module',
			'extends'
		]
	};

exports.parser = function (options) {
	options = mixin({}, defaults, options);

	return tunic(options);
};
