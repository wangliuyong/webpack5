import a from './a' // 动态引入，也按需加载
import jsxDemo from './demo.jsx' // // 直接引入
const b = import('./b')

const fn = () => {
    console.log(a,b)
    console.log(jsxDemo)
    console.log(Promise.resolve('hi wly'))
}
fn()
