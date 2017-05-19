'use strict'
const express = require('express')
const server = express()

const C = (require('./config/ServerConfig'))
global.ServerConfig = new C()

server.use(express.static(ServerConfig.WEBROOT))

//###################### start the server
server.listen(ServerConfig.WWW_PORT, '0.0.0.0', function() {
	console.log('App listening on port '+ServerConfig.WWW_PORT)
	console.log('Press Ctrl+C to quit.')
})
