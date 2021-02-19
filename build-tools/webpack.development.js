const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Webpack development configuration
 *
 * @param {import('webpack').Configuration} env
 */
module.exports = env => ({
	devServer: {
		port: 3000,
	},
	plugins: [new HtmlWebpackPlugin()],
});
