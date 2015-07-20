/**
 * # Toga CSS
 *
 * Generates an abstract syntax tree based on a customizable regular-expression
 * grammar for use in the Toga eco-system.
 *
 * @title Toga CSS
 * @name toga-css
 */

import Tunic from 'tunic';

var parserDefaults = {
	name: 'toga-css',
	extension: /.(css|less|scss)$/,
	namedTags: [
		'arg',
		'argument',
		'atom',
		'class',
		'extends',
		'inherits',
		'mixin',
		'module',
		'molecule',
		'object',
		'organism',
		'param',
		'parameter'
	]
};

export function parser(options) {
	return new Tunic({
		...parserDefaults,
		...options
	});
}
