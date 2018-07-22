const 	path 	= require('path'),
		webpack = require('webpack');

module.exports = {
	entry: './dist/js/scripts.js',
	output: {
		path: path.resolve(__dirname, './prod/js'),
		filename: 'scripts.min.js'
	},
	resolve: {
		extensions: ['.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',

			},
			{
				test: require.resolve('jquery'),
				use: [
					{
						loader: 'expose-loader',
						options: '$'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	]
}