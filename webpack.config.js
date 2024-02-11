const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {

entry: './src/index.js',
output: {
	publicPath: '/',
	path: path.resolve(__dirname, '/app'),
	filename: 'app.js'
},
devServer: {
	static: path.join(__dirname, '/app'),
	port: 8081,
	compress: true,
	devMiddleware: {
		writeToDisk: true,
	},

},
module: {
	rules: [
		{
			test: /\.html$/i,
			loader: 'html-loader'
		},
		{
			test: /\.(sa|sc|c)ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'sass-loader'
			]
		},
		{
			test: /\.(svg|eot|woff|woff2|ttf)$/,
			exclude: /images/,
			use: [
			  {
				 loader: "file-loader", 
				 options: {
					name: '[name].[ext]',
					outputPath: "assets/fonts",
				 }
			  }
			]
		 },
	],
},
plugins: [
	new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: './src/index.html',
	}),
	new OptimizeCSSAssetsPlugin({}),
	new MiniCssExtractPlugin({
		filename: "assets/css/style.css"
	})
],

}