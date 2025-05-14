const path = require('path');
// 分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 分离html文件
const HTMLPlugin = require('html-webpack-plugin');
const { Generator } = require('webpack');

module.exports = {
  mode: 'development', 
  // 入口
  // entry: './src/index.js',
  entry:{
    index:'./src/index.js',
    login:'./src/login/login.js'
  },
  // 出口
  output: {
    filename: '[name].js',
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
      },
      {
        //匹配图片文件
        test:/\.(png|jpg|gif|jpeg)/,
      type:'asset',
      generator:{
        filename:'img/[name].[hash:6][ext]'
      },
      parser:{
        dataUrlCondition:{
          maxSize:10*1024
        }
      }
    }
    ]
  },
  plugins: [
    // 单独提取CSS
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    // 配置HTML插件
    new HTMLPlugin({
      template: "./public/index.html", // 指定模板文件路径
      filename: "index.html", // 输出的HTML文件名
      inject: "body", // 将脚本注入到body底部,
      chunks:['index']
    }),
    new HTMLPlugin({
      template: "./public/login.html", // 指定模板文件路径
      filename: "login.html", // 输出的HTML文件名
      inject: "body", // 将脚本注入到body底部,
      chunks:['login']
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
  devServer: {
    // 使用static选项替代contentBase
    static: {
      directory: path.join(__dirname, 'dist')
    },
    // 压缩
    compress: true,
    port: 8080,
    hot: true,//自动更新浏览器
    open: true  ,
    historyApiFallback: true, // 添加这一行
  }
};