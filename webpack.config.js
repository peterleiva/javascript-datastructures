const path = require("path");
const { merge } = require("webpack-merge");
const applyPresets = require("./build-tools/apply-presets");
const { ProgressPlugin } = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

/**
 * Loads a configuration file living inside buid-tools
 *
 * @param {"development" | "production" | "none"} env environment to be loaded
 * @return {import('webpack').Configuration}
 */
const loadEnvConfiguration = env => {
	const configPath = `./build-tools/webpack.${env}`;

	try {
		require.resolve(configPath);
	} catch (error) {
		return {};
	}

	return require(configPath)(env);
};

/**
 * Webpack base configuration file
 *
 * @param {import('webpack').Configuration & {presets: []}} env
 * @return {import('webpack').Configuration}
 */
module.exports = ({ mode = "production", presets = [] }) =>
	merge(
		{
			entry: path.resolve(__dirname, "src", "index.ts"),
			mode,

			module: {
				rules: [
					{
						test: /\.ts$/,
						use: "ts-loader",
						exclude: /node_modules/,
					},
				],
			},

			resolve: {
				extensions: [".ts", ".js"],
				plugins: [new TsconfigPathsPlugin()],
			},

			plugins: [
				new ProgressPlugin(),
				new ESLintWebpackPlugin({
					context: path.resolve("src"),
					extensions: ".ts",
				}),
			],

			output: {
				filename: "index.js",
				path: path.resolve(__dirname, "dist"),
				libraryTarget: "commonjs2",
			},
		},
		loadEnvConfiguration(mode),
		applyPresets({ mode, presets })
	);
