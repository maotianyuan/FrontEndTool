'use strict'

const opn = require('opn')
const server = require("./server")
const router = require("./router")
const config = require('../config')
const PORT = config.dev.port
const HOST = config.dev.host
server.start(router.route)

if(config.dev.autoOpenBrowser){
	opn(`http://${HOST}:${PORT}`)
}