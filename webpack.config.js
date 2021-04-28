const mode = 'production'

module.exports = {
  mode,
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // 匹配规则.jsx .tsx
        exclude: /node_modules/,  // 排除node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ // 预先的规则集合
              ['@babel/preset-env'], // es6 => es5
            ]
          }
        }
      },
      
    ]
  }
}
