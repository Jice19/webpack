const path = require('path')

module.exports = {
  // 入口
  entry:'./src/index.js',
  // 出口
  output:{
    filename:'bundle.js',
    // 使用node方法输出
    path:path.resolve(__dirname, './dist')
  },
  module:{
    rules:[
      // 配置很多处理方案：css、es6、vue、react
      {
        // 相当于src：找对应匹配文件
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  }
}