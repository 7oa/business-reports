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
    files: [
      { pattern: "src/scripts/**/*.ts" },
      { pattern: "mocks/*.ts" },
      { pattern: "src/scripts/**/*.test.ts" },
    ],
    preprocessors: {
      "src/scripts/**/*.ts": ["karma-typescript"],
      "mocks/*.ts": ["karma-typescript"],
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
