/* eslint-disable */
'use strict';

require.extensions['.css'] = () => ({});
require.extensions['.ico'] = () => '';
require.extensions['.woff'] = () => '';
require.extensions['.svg'] = () => '';
require.extensions['.png'] = () => '';
require.extensions['.jpg'] = () => '';
require.extensions['.gif'] = () => '';

require('babel-register')({
	ignore: false,
	only: /src/,
	extensions: ['.js'],
	presets: ['es2015'],
	plugins: ['istanbul', 'transform-flow-strip-types']
});
