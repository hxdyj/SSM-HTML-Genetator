const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
let externals = _externals()
export default {
	entry: {
		server: './index.js'
	},
	target: 'node',
	plugins: [
		new UglifyJsPlugin({
			sourceMap: false,
			uglifyOptions: {
				compress: true
			}
		}),
		new webpack.DefinePlugin({
			PRODUCTION: true
		})
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/'
	},
	externals: externals,
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [path.resolve(__dirname, 'node_modules')],
				query: {
					plugins: [
						'transform-runtime',
						'transform-decorators-legacy',
						'transform-class-properties'
					],
					presets: ['es2015', 'stage-0']
				}
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json']
	},
	context: __dirname,
	node: {
		console: true,
		global: true,
		process: true,
		Buffer: true,
		__filename: true,
		__dirname: true,
		setImmediate: true
	}
}

function _externals() {
	let manifest = require('./package.json')
	let dependencies = manifest.dependencies
	let externals = {}
	for (let p in dependencies) {
		externals[p] = 'commonjs ' + p
	}
	return externals
}
