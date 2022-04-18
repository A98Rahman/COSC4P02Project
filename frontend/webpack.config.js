const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "./index.html"
});
module.exports = {
	entry: "./src/index.js",
	mode: "development",
	output: {
		path: path.resolve(__dirname, '../server/dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[hash]-[name].[ext]',
						}
					},
				],
			}
		]
	},
	devServer: {
		open: true,
		proxy: {
			'/rasa': {
				target: 'http://localhost:3001',
				pathRewrite: { '^/rasa': '' },
				secure: false,
			},
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: { '^/api': '' },
				secure: false,
			},
		},
		historyApiFallback: true
	},
	plugins: [htmlPlugin]
};