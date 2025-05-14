// 引入css文件
require('./css/init.css')
import img from './image/img.png'

const show = require('./show.js')
show('Jice19')

const image = document.createElement('img')
image.src = img
document.body.appendChild(image)