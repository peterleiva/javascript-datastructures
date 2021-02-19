const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**
 * Webpack development configuration
 *
 * @param {import('webpack').Configuration} env
 * @return {import('webpack').Configuration}
 */
module.exports = env => ({
	plugins: [new CleanWebpackPlugin()],
});
