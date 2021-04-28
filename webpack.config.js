const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const mode = 'production'

module.exports = {
  mode,
  entry: {
    main: './src/index.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/') // 相对路径
    }
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'] // 不加 .jsx 就不会检查 jsx 文件了
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // 匹配规则.jsx .tsx
        exclude: /node_modules/,  // 排除node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ // 预先的规则集合
              ['@babel/preset-env'], // es6 => es5根据env 根据环境自主打包
              ['@babel/preset-react', {runtime: 'classic'}], // jsx  打包规则  classic 兼容老版本react
              ['@babel/preset-typescript']
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                compileType: 'icss',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import "~@/style/var/index.scss";`, // 搜友scss 文件自动引入var/index.scss，无需手动引入
              sassOptions: {
                includePaths: [__dirname]
              },
            },
          }
        ]
      },
    ]
  }
}
