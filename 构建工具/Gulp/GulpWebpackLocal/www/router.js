'use strict'

const config = require('../config')
const httpProxy = require('http-proxy') 
const PORT = config.dev.port
const HOST = config.dev.host
var proxy = httpProxy.createProxyServer({
    target: `http://${HOST}:${PORT}`,//默认接口地址
    secure: false,
    changeOrigin:true,
});
proxy.on('error', function(err, req, res){
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    console.log(err);
    res.end('Something went wrong. And we are reporting a custom error message.');
});

function route(req,res,retHost){
    req.url = req.url.replace(retHost.regexp,'/');
    proxy.web(req, res,{target:retHost.api});
}

exports.route = route