'use strict'
import * as express from 'express'
const server: express.Application = express()

import * as cors from 'cors'
import * as compression from 'compression'
server.use(cors())
server.use(compression())

import ServerConfig  = require ('./config/ServerConfig')
const conf = new ServerConfig()

import Decider =require ( './utils/Decider')
const decider = new Decider()

// ###################### static
server.use(decider.decide)
server.use(express.static(conf.WEBROOT))

//###################### start the server
server.listen(conf.WWW_PORT, '0.0.0.0', function() {
	console.log('App listening on port '+ conf.WWW_PORT)
	console.log('Press Ctrl+C to quit.')
})
