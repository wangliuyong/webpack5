module.exports = {
  extends: ['react-app'], // 继承react-app  规则
  rules: { // 自定义规则
    'react/jsx-uses-react': [2], // 0不起作用 1警告 2错误
    // 提示要在 JSX 文件里手动引入 React
    'react/react-in-jsx-scope': [2],
    'no-console': [0]
  },
  // overrides: [{
  //   files: ['*.ts', '*.tsx'],
  //   parserOptions: {
  //     project: './tsconfig.json',
  //   },
  //   extends: ['airbnb-typescript'],
  //   rules: {
  //     '@typescript-eslint/object-curly-spacing': [0],
  //     'import/prefer-default-export': [0],
  //     'no-console': [0],
  //     'import/extensions':[0]
  //   }
  // }]
}
