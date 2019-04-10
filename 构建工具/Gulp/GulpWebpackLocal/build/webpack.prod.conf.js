'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const banner = 'lastmodify: ' + new Date().toLocaleString()
const webpackConfig = merge(baseWebpackConfig, {
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner, {
            entryOnly: true
        }),
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
        })
    ]
})
module.exports = webpackConfig
