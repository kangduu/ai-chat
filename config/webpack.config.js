const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const config = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
            ],
          },
          {
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
              "less-loader",
            ],
          },
          {
            use: ["style-loader", "css-loader", "less-loader"],
          },
        ],
      },
      {
        test: /\.(png|jpg|jpe?g|gif|webp|svg)$/,
        exclude: [path.resolve(__dirname, '../src/assets/icon')],
        type: 'asset', // 静态资源 https://webpack.docschina.org/guides/asset-modules/
        parser: {
          dataUrlCondition: {
            maxSize: 5 * 1024
          }
        },
        generator: {
          filename: 'static/images/[hash:4][file][ext][query]'
        }
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/assets/icon'),
        use: ['@svgr/webpack']
      },
      {
        test: /.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    // 在单独进程上运行TypeScript类型检查器的Webpack插件。项目大了之后有助于提升编译性能，配合ts-loader的transpileOnly:true使用
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        build: true,
        mode: "write-dts",
        configOverwrite: {
          declaration: true,
          declarationDir: "./dist",
        },
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/assets': path.resolve(__dirname, '../src/assets'),
      '@/utils': path.resolve(__dirname, '../src/utils'),
      '@/hook': path.resolve(__dirname, '../src/hook'),
      '@/icon': path.resolve(__dirname, '../src/icon')
    }
  },
};

module.exports = config;
