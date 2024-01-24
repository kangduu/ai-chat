const path = require("path");
module.exports = function (api) {
  api.cache(false);
  // 预设的运行顺序是从后往前
  const presets = ["@babel/preset-env", "@babel/preset-typescript"];
  // 插件的运行顺序是从前往后
  const plugins = [path.resolve(__dirname, "./scripts/auto-css-modules.ts")];
  return {
    presets,
    plugins,
  };
};
