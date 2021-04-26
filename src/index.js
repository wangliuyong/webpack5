import a from './a' // // 直接引入
const b = import('./b') // 动态引入，也按需加载

const fn = () => {
    console.log(a,b)
    console.log(Promise.resolve('hi wly'))
}
fn()
