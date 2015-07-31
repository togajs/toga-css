/**
 * # Toga CSS
 *
 * Generates an abstract syntax tree based on a customizable regular-expression
 * grammar for use in the Toga eco-system.
 *
 * @title Toga CSS
 * @name toga-css
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.parser = parser;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tunic = require('tunic');

var _tunic2 = _interopRequireDefault(_tunic);

var parserDefaults = {
	name: 'toga-css',
	extension: /.(css|less|scss)$/,
	namedTags: ['arg', 'argument', 'atom', 'class', 'extends', 'inherits', 'mixin', 'module', 'molecule', 'object', 'organism', 'param', 'parameter']
};

function parser(options) {
	return new _tunic2['default'](_extends({}, parserDefaults, options));
}