## 安装依赖

```
yarn
```

## 运行 TS 代码

```
node -r ts-node/register --inspect-brk xxx.ts
```

## 运行 JS 代码

```
node xxx.js
```

总结
# AST   let_to_var.ts

1.parse 把代码code1变成AST
2.traverse 遍历AST1 然后惊醒修改生成AST2
3.generate  把AST2 变成代码code2

衍生工具babel
@babel/parse
@babel/traverse
@babel/generator

@babel/core  包含前三者
@babel/preset-env  内置很多规则   es6  => es5
