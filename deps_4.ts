// 优化循环依赖，依赖不在重复收集
// 使用 node -r ts-node/register 文件路径 来运行，
// 如果需要调试，可以加一个选项 --inspect-brk，再打开 Chrome 开发者工具，点击 Node 图标即可调试
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { readFileSync } from 'fs';
import { dirname, relative, resolve } from 'path';

// 设置根目录
const projectRoot = resolve(__dirname, 'project_4')
// 类型声明
type DepRelation = { [key: string]: { deps: string[], code: string } }
// 初始化一个空的 depRelation，用于收集依赖
const depRelation: DepRelation = {}

// 将入口文件的绝对路径传入函数，如 D:\demo\fixture_1\index.js
collectCodeAndDeps(resolve(projectRoot, 'index.js'))

console.log(depRelation)
console.log('done')

function collectCodeAndDeps(filepath: string) {
  const key = getProjectPath(filepath) // 文件的项目路径，如 index.js
  if(Object.keys(depRelation).includes(key)){
    console.warn(`duplicated dependency: ${key}`) // 注意，重复依赖不一定是循环依赖
    return
  }
  // 获取文件内容，将内容放至 depRelation
  const code = readFileSync(filepath).toString()
  // 初始化 depRelation[key]
  depRelation[key] = { deps: [], code: code }
  // 将代码转为 AST
  const ast = parse(code, { sourceType: 'module' }) 
  // 分析文件依赖，将内容放至 depRelation
  traverse(ast, {
    enter: path => {
      if (path.node.type === 'ImportDeclaration') {
        // path.node.source.value 往往是一个相对路径，如 ./a.js，需要先把它转为一个绝对路径
        const depAbsolutePath = resolve(dirname(filepath), path.node.source.value)
        // 然后转为项目路径
        const depProjectPath = getProjectPath(depAbsolutePath)
        // 把依赖写进 depRelation
        depRelation[key].deps.push(depProjectPath)
        collectCodeAndDeps(depAbsolutePath)
      }
    }
  })
}
// 获取文件相对于根目录的相对路径
function getProjectPath(path: string) {
  return relative(projectRoot, path).replace(/\\/g, '/')
}