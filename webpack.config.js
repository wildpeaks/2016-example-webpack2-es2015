/* eslint-env node */
/* eslint-disable indent */
'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcss_cssnext = require('postcss-cssnext');


module.exports = ({debug = false, minify = false, production = false} = {}) => {
	const environment = production ? 'production' : 'development';
	let plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(environment)
		})
	];
	if (minify){
		plugins = plugins.concat([
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				compress: {
					warnings: false
				},
				output: {
					comments: false
				}
			})
		]);
	}

	return {
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
					loader: ExtractTextPlugin.extract({
						fallbackLoader: 'style-loader',
						loader: [
							{
								loader: 'css-loader',
								query: {
									modules: true
								}
							},
							'postcss-loader'
						]
					})
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
			new webpack.LoaderOptionsPlugin({
				debug,
				minimize: minify
			}),
			new ExtractTextPlugin('application.min.css'),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: path.join(__dirname, 'src/application.html')
			})
		])
	};
};
