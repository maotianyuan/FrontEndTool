'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const banner = 'lastmodify: ' + new Date().toLocaleString()
const devWebpackConfig = merge(baseWebpackConfig, {
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner, {
            entryOnly: true
        }),
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
    ]
})
module.exports = devWebpackConfig
