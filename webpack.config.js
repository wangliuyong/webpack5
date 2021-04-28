const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const mode = 'production'

module.exports = {
  mode,
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].js'
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
    }),
    // 自动生成html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index']
    }),
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
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single', // 运行时文件 single=> 单独打包；是其他文件能正常运行的依赖；抽离出来可以使用户少请求文件（缓存）
    splitChunks: {
      cacheGroups: {
        vendor: {
          priority: 10,
          minSize: 0, /* 如果不写 0，文件尺寸太小，会直接跳过 */
          test: /[\\/]node_modules[\\/]/, // 为了匹配 /node_modules/ 或 \node_modules\
          name: 'vendors', // 文件名
          chunks: 'all',  // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
          // 这三行的整体意思就是把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
          // 其中 vendors 是第三方的意思
        },
        common: {
          priority: 5,
          minSize: 0,
          minChunks: 2,
          chunks: 'all',
          name: 'common'
        }
      },
    },
  },
}
