module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["vighnesh153"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
