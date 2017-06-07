'use strict'
import * as express from 'express'
const server: express.Application = express()

import * as cors from 'cors'
import * as compression from 'compression'
server.use(cors())
server.use(compression())

import ServerConfig  = require ('./config/ServerConfig')
const conf = new ServerConfig()

/* optional:
const scribe = require('scribe-js')()
const console = process.console
server.use(scribe.express.logger()) //Log each request for now
server.use('/logs', scribe.webPanel())
const debug = require('debug')('my-app')
debug('oh hi')
*/

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

