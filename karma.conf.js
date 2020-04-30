const realBrowser = String(process.env.BROWSER).match(/^(1|true)$/gi);
const travisLaunchers = {
  chrome_travis: {
    base: "Chrome",
    flags: ["--no-sandbox"],
  },
};

const localBrowsers = realBrowser ? Object.keys(travisLaunchers) : ["Chrome"];

module.exports = (config) => {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    plugins: ["karma-jasmine", "karma-chrome-launcher", "karma-typescript", "karma-spec-reporter"],
    karmaTypescriptConfig: {},
    client: {
      // leave Jasmine Spec Runner output visible in browser
      clearContext: false,
    },
    files: [{ pattern: "src/scripts/**/*.ts" }, { pattern: "src/scripts/**/*.test.ts" }],
    preprocessors: {
      "src/scripts/**/*.ts": ["karma-typescript"],
      "src/scripts/**/*.test.ts": ["karma-typescript"],
    },
    reporters: ["spec", "karma-typescript"],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: localBrowsers,
    singleRun: true,
  });
};

// Karma configuration
// Generated on Tue Apr 28 2020 11:54:28 GMT+0300 (GMT+03:00)

// module.exports = function (config) {
//   config.set({
//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: "",

//     // frameworks to use
//     // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//     frameworks: ["jasmine", "karma-typescript"],
//     plugins: ["karma-jasmine", "karma-chrome-launcher", "karma-typescript", "karma-spec-reporter"],

//     // list of files / patterns to load in the browser
//     files: [{ pattern: "test/**/*.spec.ts" }],

//     // list of files / patterns to exclude
//     exclude: [],

//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//     preprocessors: {
//       "test/**/*.spec.ts": ["karma-typescript"],
//     },

//     // test results reporter to use
//     // possible values: 'dots', 'progress'
//     // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//     reporters: ["spec", "karma-typescript"],

//     // web server port
//     port: 9876,

//     // enable / disable colors in the output (reporters and logs)
//     colors: true,

//     // level of logging
//     // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_INFO,

//     // enable / disable watching file and executing tests whenever any file changes
//     autoWatch: true,

//     // start these browsers
//     // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//     browsers: ["Chrome"],

//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//     singleRun: false,

//     // Concurrency level
//     // how many browser should be started simultaneous
//     concurrency: Infinity,
//   });
// };
