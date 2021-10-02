const { resolve } = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	globals: {
		"ts-jest": {
			tsconfig: resolve(__dirname, "tsconfig.spec.json"),
		},
	},

	testEnvironment: "node",
	roots: ["<rootDir>/src", "<rootDir>/test"],
	moduleDirectories: ["node_modules", "<rootDir>/src", "<rootDir>/test"],

	collectCoverage: true,
	coverageDirectory: resolve(__dirname, "coverage"),
	coverageReporters: ["lcov", "text", "html"],
	coverageProvider: "v8",
	coveragePathIgnorePatterns: ["<rootDir>/test"],

	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
};
