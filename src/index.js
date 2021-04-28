import {a} from '@/a' // 直接引入
import {jsxDemo} from '@/demo-jsx.jsx'
import {tsDemo} from '@/demo-ts.ts'
import './style/index.scss'
const b = import('@/b') // 动态引入，也按需加载


console.log(jsxDemo)

const hi = () => {
  console.log(a)
  console.log(b)
  console.log(tsDemo)
  console.log(Promise.resolve('支持ie')) // ie 中没有Promise,如需要支持需要添加polyfill
}

hi()
