const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "./index.html"
});
module.exports = {
	entry: "./src/index.js",
	mode: "development",
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
			'/api': {
				target: 'http://localhost:5005',
				pathRewrite: { '^/api': '' },
				secure: false,
			}
		}
	},
	plugins: [htmlPlugin]
};