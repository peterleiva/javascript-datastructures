const { merge } = require("webpack-merge");
const { flatten } = require("lodash");

/**
 * Webpack development configuration
 *
 * @param {import('webpack').Configuration & {presets: []}} env
 * @return {import('webpack').Configuration}
 */
const applyPresets = env => {
	const presets = env.presets || [];

	const mergedConfigs = flatten(presets).map(presetName => {
		try {
			const presetPath = `./presets/webpack.${presetName}`;
			require.resolve(presetPath);
		} catch {
			return {};
		}

		return require(`./presets/webpack.${presetName}`)(env);
	});

	return merge({}, mergedConfigs);
};

module.exports = applyPresets;
