const path = require("path");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.spec.json");

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	globals: {
		"ts-jest": {
			tsconfig: path.resolve(__dirname, "tsconfig.spec.json"),
		},
	},

	collectCoverage: true,
	coverageDirectory: "coverage",
	rootDir: path.resolve(__dirname, "src"),

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: "v8",

	moduleDirectories: ["node_modules", "<rootDir>"],

	notify: true,

	// The test environment that will be used for testing
	testEnvironment: "node",
};
