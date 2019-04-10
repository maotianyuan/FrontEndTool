'use strict'

const os = require('os')
const path = require('path')
const utils = require('../build/utils')

module.exports = {
    dev: {
        // ----------gulpfiles----------------
        folder:utils.getFolder(), //example
        banner: utils.getBanner(), //js 打包提示
        htmlData: utils.htmlData(), //版本号
        watch:utils.getWatch(), 
        // -----------proxy---------------
        autoOpenBrowser:true, //默认是否打开浏览器
        port:8080,
        host:'127.0.0.1',
        assetsPublicPath:'public',
        htmlResourcePath:'resources/views',
        htmlSuffix:'.blade.php',
    },

    build: {
       
    }
}