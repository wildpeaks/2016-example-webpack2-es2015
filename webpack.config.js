/* eslint-env node */
/* eslint-disable indent */
'use strict';
const path = require('path');
const webpack = require('webpack');
const postcss_cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const debug = process.argv.indexOf('--debug') > -1;
const minify = process.argv.indexOf('--minify') > -1;
const environment = (process.argv.indexOf('--production') > -1) ? 'production' : 'development';

let plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(environment)
	})
];

if (minify){
	plugins = plugins.concat([
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		}),
		new webpack.NoErrorsPlugin()
	]);
}

module.exports = [
	{
		debug,
		target: 'web',
		devtool: 'source-map',
		entry: './src/application.js',
		output: {
			publicPath: '',
			filename: 'application.min.js',
			path: path.resolve(__dirname, 'www')
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel',
					query: {
						compact: true,
						presets: ['es2015'],
						plugins: ['transform-flow-strip-types', 'transform-runtime']
					},
					include: [path.resolve(__dirname, 'src')]
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules!postcss-loader')
				},
				{
					test: /\.(jpg|png|gif|svg)$/,
					loader: 'url?limit=10000&name=assets/[name].[ext]'
				},
				{
					test: /\.(ico|woff)$/,
					loader: 'url?limit=1&name=assets/[name].[ext]'
				}
			]
		},
		postcss: [
			postcss_cssnext({
				browsers: ['last 2 version', 'ie >= 11']
			})
		],
		plugins: plugins.concat([
			new ExtractTextPlugin('application.min.css'),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: path.join(__dirname, 'src/application.html')
			})
		])
	}
];
