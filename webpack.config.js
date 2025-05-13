const path = require('path');
// 分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 分离html文件
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    filename: 'bundle.js',
    // 使用Node方法输出
    path: path.resolve(__dirname, './dist'),
    clean: true, // 每次构建前清理dist目录
  },
  module: {
    rules: [
      {
        // 匹配CSS文件
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    // 单独提取CSS
    new MiniCssExtractPlugin({
      filename: "main.css"
    }),
    // 配置HTML插件
    new HTMLPlugin({
      template: "./public/index.html", // 指定模板文件路径
      filename: "index.html", // 输出的HTML文件名
      inject: "body", // 将脚本注入到body底部
    }),
  ],
  optimization: {
    minimizer: [
      // 使用内置的TerserPlugin压缩JS（Webpack 5默认包含）
      `...`, 
      // 使用css-minimizer-webpack-plugin压缩CSS
      new CssMinimizerPlugin(),
    ],
  },
};