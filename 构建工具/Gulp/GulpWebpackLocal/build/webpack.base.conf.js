'use strict'
const path = require('path')
const config = require('../config')
const folderName = process.argv[2]
const PROJECT = (() => {
    let str = folderName.split('-')[0] || 'bmwdashboard'
    let nstr = str.replace('.', '')
    return nstr.replace('+', '')
})()

var sourceConfig = require('../' + PROJECT + '/source.config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const baseWebpackConfig = {
    entry: {},
    output: {
        path: resolve('public/js'),
        filename: '[name].min.js',
        chunkFilename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)(-lazy)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            discardComments: { removeAll: true }
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.html$/,
            loader: "text"
        }, {
            test: /\.blade.php$/,
            loader: "text"
        }, {
            test: /\.pug$/,
            loader: "pug-loader"
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
        }],
        postLoaders: [{
                test: /\.(js|jsx)(-lazy)?$/,
                loaders: ['es3ify-loader']
            },
            // 这个配置放到打包到生产环境中去，测试环境打到一个包
            {
                test: /-lazy\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'bundle-loader?lazy&name=[name]'
            }
        ]
    },
    htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/]
    },
    resolve: {
        extensions: ['', '.js', '.json', 'less', 'scss', 'html', '.blade.php'],
        root: path.dirname(__dirname),
        alias: {}
    },
    resolveLoader: {
        root: path.join(__dirname, '../node_modules')
    },
    externals: {
        'jQuery': 'window.jQuery',
        'jquery': 'window.jQuery',
        'Zepto': 'window.Zepto'
    },
}
Object.assign(baseWebpackConfig.resolve.alias, sourceConfig)
module.exports = baseWebpackConfig