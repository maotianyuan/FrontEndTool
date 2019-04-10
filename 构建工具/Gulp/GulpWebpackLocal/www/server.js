const http = require("http")
const path = require('path')
const url = require("url") //导入内置url模块
const fs = require('fs')
const config = require('../config')
const apiConfig = require('../api.config')
const {
    package,
    webPath,

} = config.dev.folder
const routerConfig = require('../'+webPath+'/router.config');
const PORT = config.dev.port //服务端口
const HOST = config.dev.host 
const assetsPublicPath = config.dev.assetsPublicPath //js css资源默认添加前缀
const htmlResourcePath = config.dev.htmlResourcePath //模板html资源默认添加前缀
const htmlSuffix = config.dev.htmlSuffix //html后缀 .blade.php
const mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "php": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
    "woff": "application/x-woff",
    "woff2": "application/x-woff2",
    "tff": "application/x-font-truetype",
    "otf": "application/x-font-opentype",
    "eot": "application/vnd.ms-fontobject"
};

var apiHost = (pathName) => {
    //配置API接口服务器IP
    let obj = null;
    apiConfig.map((k, i) => {
        if (k.regexp.test(pathName)) {
            obj = k;
            return;
        }
    });
    return obj || null;
};

var roterHost = (pathName) => {
    //配置API接口服务器IP
    let obj = null;
    routerConfig.map((k, i) => {
        if (k.router == pathName) {
            obj = k;
            return;
        }
    });
    return obj || null;
}


var handle_404 = () => {
    //查找404路由信息
    let obj = null;
    routerConfig.map((k, i) => {
        if (k.tag === '404') {
            obj = k;
            return;
        }
    });
    return obj || null;
};

function start(proxyRoute) {
    function onRequest(req, res) {
        var pathName = url.parse(req.url).pathname; //提取url
        //判断如果是接口访问，则通过proxy转发
        let retHost = apiHost(pathName)
        if (retHost) {
            proxyRoute(req, res, retHost)
            return
        }

        let rotHost = roterHost(pathName);
        if (rotHost) {
            // resources/view是基于laraval
            var realPath = decodeURIComponent(path.join(__dirname, '../', package, htmlResourcePath, rotHost.path + htmlSuffix));
        } else {
            // public 也是基于laraval php
            var realPath = decodeURIComponent(path.join(__dirname, '../', package, assetsPublicPath, pathName));
        }

        var extName = realPath;
        var indexOfQuestionMark = extName.indexOf('?');
        if (indexOfQuestionMark >= 0) {
            extName = extName.substring(0, indexOfQuestionMark);
            realPath = realPath.substring(0, indexOfQuestionMark);
        }
        extName = path.extname(extName);
        extName = extName ? extName.slice(1) : 'unknown';
        handleRoute(res, realPath, extName)
    }

    function handleRoute(res, realPath, extName) {
        fs.exists(realPath, function(exists) {
            if (!exists) {

                let rotHost = handle_404()
                // if (rotHost) {
                    // let _realPath = decodeURIComponent(path.join(__dirname, package, htmlResourcePath, rotHost.path + htmlSuffix));
                    // handleRoute(res, _realPath, 'php')
                    // return
                // } else {
                    res.writeHead(404, {
                        'content-type': 'text/plain'
                    });
                    res.write('The request URL:' + realPath + ' could not be found.');
                    res.end();
                // }
                return;
            }
            fs.readFile(realPath, 'binary', function(err, file) {
                if (err) {
                    res.writeHead(500, {
                        'content-type': 'text/plain'
                    });
                    res.end(err);
                    return;
                }
                let contentType = mine[extName] || 'text/plain';
                res.writeHead(200, {
                    'content-type': contentType
                });
                res.write(file, 'binary');
                res.end();
            });
        });
    }
    http.createServer(onRequest).listen(PORT);
    console.log(`Web服务已启动...\n
        http://${HOST}:${PORT}`);
}

exports.start = start