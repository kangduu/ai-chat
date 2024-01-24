const { extname } = require("path");
// const Babel = require("@babel/core");
// const t = require("@babel/types");

const CSS_EXT_NAMES = [".css", ".less"];

module.exports = function (babel) {
  babel.cache(false);
  return {
    name: "replace-npm-package",
    visitor: {
      ImportDeclaration(path) {
        const {
          specifiers,
          source,
          source: { value },
        } = path.node;
        if (specifiers.length && CSS_EXT_NAMES.includes(extname(value))) {
          source.value = `${value}?modules`;
        }
      },
    },
  };
};
// babel 插件开发
// 请看文档
// [babel-plugins](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-introduction)

// tips
// babel运行在node环境，要让这个文件支持ts运行，1.要安装@types/node，2.要在tsconfig.json的compilerOptions的types中配置=>["node"]
