const path = require('path')

module.exports = {
  // 入口
  entry:'./src/index.js',
  // 出口
  output:{
    filename:'bundle.js',
    // 使用node方法输出
    path:path.resolve(__dirname, './dist')
  }
}