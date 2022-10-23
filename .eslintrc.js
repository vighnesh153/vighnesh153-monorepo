module.exports = {
  root: true,
  extends: ["vighnesh153/ts.eslintrc"],
  env: {
    browser: true,
    amd: true,
    node: true
  },
  settings: {
    next: {
      rootDir: ["apps/*/"]
    }
  }
};
