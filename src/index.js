import {a} from '@/a' // 直接引入
import {JsxDemo} from './jsx-demo.jsx'
import {x} from './ts-demo.ts'
import {TsxDemo} from './tsx-demo.tsx'
import '@/stylus-demo.styl'
import vars from '@/stylus-vars.styl'
import React from 'react'
import {shared} from '@/shared.js'
console.log(shared)
console.log(React)

console.log(vars)
const b = import('./b') // 动态引入，也按需加载

console.log(x)
console.log(JsxDemo)
console.log(TsxDemo)

const hi = () => {
  console.log('frank')
  console.log(a)
  console.log(b)
  console.log(Promise.resolve('test promise'))
}

hi()
