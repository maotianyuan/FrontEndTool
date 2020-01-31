# 定义
Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

```js
module.exports = {
  entry: '', // 入口
  output: {}, // 出口
  devServer: {}, // 开发服务器
  module: {}, // 模块
  plugins: [], // 插件
  mode: 'development',
  resolve: {}, // 配置解析
}
```

```js
const path = require('path')
const path = CopyWebpackPlugin();
const ExtractTextWebpackPligin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const lessExtract = new ExtractTextWebpackPligin({ // 样式抽离
  filename: 'css/less.css',
  disable: true,
})

const cssExtract = new ExtractTextWebpackPligin({ //样式抽离
  filename: 'css/css.css',
  disable: true,
})

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.[hash:8].js',
    path: path.resolve('./build'), // 路径必须绝对路径
  },
  devServer: {
    contentBase: './build',
    port: 3000,
    compress: true, // 服务器压缩
    open: true,
    hot: true,
  },
  plugins: [
    lessExtract,
    cssExtract,
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['.build']),
    new CopyWebpackPlugin([
      {
        from: './src/doc',
        to: 'public'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'a.html',
      template: './src/index.html',
      title: '', // <%= htmlWebpackPlugin.options.title%>
      hash: true, // 问号后面 hash
      chunks: ['a'],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' }
          ]
        })
      },
      {
        test: /\.less$/,
        use: lessExtract.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' },
          ]
        })
      }
    ]
  },
}
```



```js
const path = require('path')
const path = CopyWebpackPlugin();
const ExtractTextWebpackPligin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const lessExtract = new ExtractTextWebpackPligin({ // 样式抽离
  filename: 'css/less.css',
  disable: true,
})

const cssExtract = new ExtractTextWebpackPligin({ //样式抽离
  filename: 'css/css.css',
  disable: true,
})

module.exports = {
  // entry: ['./src/index.js', './src/a.js'], // 打包到一个文件
  entry: { // 多入口
    index: './src/index.js',
    a: './src/a.js',
  },
  output: { // 多出口
    filename: '[name].[hash:8].js',
    path: path.resolve('./build'), // 路径必须绝对路径
  },
  devServer: {
    contentBase: './build',
    port: 3000,
    compress: true, // 服务器压缩
    open: true,
    hot: true,
  },
  plugins: [
    lessExtract,
    cssExtract,
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['.build']),
    new CopyWebpackPlugin([
      {
        from: './src/doc',
        to: 'public'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: '', // <%= htmlWebpackPlugin.options.title%>
      hash: true, // 问号后面 hash
      chunks: ['index'],
    })
    new HtmlWebpackPlugin({
      filename: 'a.html',
      template: './src/index.html',
      title: '', // <%= htmlWebpackPlugin.options.title%>
      hash: true, // 问号后面 hash
      chunks: ['a'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' }
          ]
        })
      },
      {
        test: /\.less$/,
        use: lessExtract.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' },
          ]
        })
      }
    ]
  },
}
```