const path = require('path');
// 分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    filename: 'bundle.js',
    // 使用Node方法输出
    path: path.resolve(__dirname, './dist')
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
    })
  ],
  optimization: {
    minimizer: [
      // 使用内置的TerserPlugin压缩JS（Webpack 5默认包含）
      `...`, 
      // 使用css-minimizer-webpack-plugin压缩CSS
      new CssMinimizerPlugin()
    ],
  },
};