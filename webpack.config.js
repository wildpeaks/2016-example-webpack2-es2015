/* eslint-env node */
/* eslint-disable space-before-blocks */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcss_cssnext = require('postcss-cssnext');
const getBabelConfig = require('./babel.config.js');


/**
 * Webpack plugins, depending on commandline flags.
 * @return Array
 */
function getPlugins({debug, minify}){
	const plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development')
		}),
		new webpack.LoaderOptionsPlugin({
			debug,
			minimize: minify,
			options: {
				context: __dirname,
				postcss: [
					postcss_cssnext({
						browsers: ['last 2 version', 'ie >= 11']
					})
				]
			}
		}),
		new ExtractTextPlugin(minify ? '[name].min.css' : '[name].css')
	];
	if (minify){
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				compress: {
					warnings: false
				},
				output: {
					comments: false
				}
			})
		);
	}
	plugins.push(
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/application.html')
		})
	);
	return plugins;
}


/**
 * Generates a Webpack config.
 * @param  {Boolean} options.debug
 * @param  {Boolean} options.minify
 * @return {Object}
 */
module.exports = ({debug = false, minify = false} = {}) => ({
	target: 'web',
	devtool: 'source-map',
	entry: './src/application.js',
	output: {
		publicPath: '',
		filename: 'application.min.js',
		path: path.resolve(__dirname, 'www')
	},
	plugins: getPlugins({debug, minify}),
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				loader: 'babel',
				query: getBabelConfig({
					webpack: true
				})
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style',
					loader: [
						{
							loader: 'css',
							query: {
								modules: true
							}
						},
						'postcss'
					]
				})
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				loader: [
					{
						loader: 'url',
						query: {
							limit: 2000,
							name: 'assets/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(ico|woff)$/,
				loader: [
					{
						loader: 'url',
						query: {
							limit: 1,
							name: 'assets/[name].[ext]'
						}
					}
				]
			}
		]
	}
});
