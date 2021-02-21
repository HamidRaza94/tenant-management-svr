
module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!src/test/mock/**/*.{js,ts}",
    "!src/seed/**/*.{js,ts}",
    '!src/services/**/constants.js',
    '!src/services/**/constant.js',
    '!src/modules/clientManagement/tests/mock.js',
    '!src/modules/accountManager/test/mocks/accountMocks.js',
    '!src/modules/clientDetail/test/mocks/clientDetailMocks.js',
  ],
  runner: "groups",
  coveragePathIgnorePatterns: [],
  moduleFileExtensions: ["ts", "js"],
  coverageReporters: ["json", "lcov", "html", "xml"],
  testEnvironment: "node",
  testResultsProcessor: "jest-sonar-reporter",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  testPathIgnorePatterns: ["./build/", "./node_modules/"],
  verbose: true,
  testMatch: [
    "**/*.spec.js",
  ],
};
