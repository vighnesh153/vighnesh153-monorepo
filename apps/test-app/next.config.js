const withTM = require("next-transpile-modules")([
  "@vighnesh153/package-web-ui"
]);

module.exports = withTM({
  reactStrictMode: true,
});
