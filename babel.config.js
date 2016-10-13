/* eslint-env node */
const path = require('path');

/**
 * Generates a Babel config.
 * @param  {Boolean} options.webpack
 * @param  {Boolean} options.istanbul
 * @return {Object}
 */
module.exports = ({webpack = false, istanbul = false} = {}) => {
	let config = {};
	if (webpack){
		config = {
			compact: true,
			presets: [
				['es2015', {modules: false}]
			],
			plugins: ['transform-flow-strip-types', 'transform-runtime']
		};
	} else { // babel-register
		config = {
			ignore: false,
			only: [
				path.resolve(__dirname, 'src')
			],
			extensions: ['.js'],
			presets: [
				'es2015'
			],
			plugins: istanbul ? ['istanbul', 'transform-flow-strip-types'] : ['transform-flow-strip-types']
		};
	}
	return config;
};
