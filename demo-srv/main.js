'use strict'
//npm install babel-plugin-transform-custom-element-classes
const express = require('express')
const server = express()

const cors = require('cors')
const compression = require('compression')
server.use(cors())
server.use(compression())

const C = (require('./config/ServerConfig'))
global.ServerConfig = new C()

const Decider = require('./utils/Decider')

// ###################### static
server.use(Decider.decide)
server.use(express.static(ServerConfig.WEBROOT))

//###################### start the server
server.listen(ServerConfig.WWW_PORT, '0.0.0.0', function() {
	console.log('Web server listening at http://localhost:'+ServerConfig.WWW_PORT)
	console.log('Press Ctrl+C to quit.')
})

