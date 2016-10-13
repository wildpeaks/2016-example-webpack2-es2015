/* eslint-env node */
const path = require('path');
const babel = require('babel-register');
const getBabelConfig = require('./babel.config.js');
const flags = process.argv;


if (flags.includes('--env.loaders')){
	require.extensions['.css'] = () => ({});
	['.ico', '.woff', '.svg', '.jpg', '.png', '.gif'].forEach(ext => {
		/* eslint-disable prefer-template */
		/* eslint-disable no-underscore-dangle */
		require.extensions[ext] = function(mod, filename) {
			return mod._compile(
				'module.exports = ' + JSON.stringify(path.basename(filename)) + ';',
				filename
			);
		};
	});
}

if (flags.includes('--env.babel')){
	babel(
		getBabelConfig({
			istanbul: flags.includes('--env.istanbul')
		})
	);
}
