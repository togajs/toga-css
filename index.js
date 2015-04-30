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

import Tunic from 'tunic';
import mixin from 'mtil/object/mixin';

var parserDefaults = {
	extension: /.(css|less|scss)$/,
	namedTags: [
		'module',
		'extends'
	]
};

export function parser(options) {
	options = mixin({}, parserDefaults, options);

	return new Tunic(options);
}
