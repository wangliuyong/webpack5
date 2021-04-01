// code1 => ast1 => ast2 => code2
import generate from "@babel/generator"; //ast2 => code2
import { parse } from "@babel/parser"; //code1 => ast1
import traverse from "@babel/traverse"; //ast1 => ast2


var fs = require("fs");

var code = fs.readFileSync('./test.js','utf-8');

console.log(code);

const ast = parse(code, { sourceType: 'module' })
console.log(ast)
traverse(ast, {
  enter: item => {
    if(item.node.type === 'VariableDeclaration'){
      if(item.node.kind === 'let'){
        item.node.kind = 'var'
      }
    }
  }
})
const result = generate(ast, {}, code)
console.log(result.code)