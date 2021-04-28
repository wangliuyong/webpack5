import {a} from '@/a' // 直接引入
import {jsxDemo} from '@/demo-jsx.jsx'
import {tsDemo} from '@/demo-ts.ts'
import './style/index.scss'
import varScss from './style/var/export-var.scss'

import {common} from './common'


const b = import('@/b') // 动态引入，也按需加载

console.log(common)
console.log(jsxDemo)
console.log('varScss',varScss)

const hi = () => {
  console.log(a)
  console.log(b)
  console.log(tsDemo)
  console.log(Promise.resolve('支持ie')) // ie 中没有Promise,如需要支持需要添加polyfill
}

hi()