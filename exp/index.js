'use strict'
const express = require('express')
const server = express()

const C = (require('./config/ServerConfig'))
global.ServerConfig = new C()

//######################
const Nightmare = require('nightmare');
const screenshotSelector = require('nightmare-screenshot-selector');
const fs = require('fs')
Nightmare.action('screenshotSelector', screenshotSelector)
 
var nightmare = Nightmare()
nightmare
        .goto('http://localhost:8000/page/one/')
        .viewport(800,600)
        .wait('#morris-ready')
        .screenshotSelector('#myfirstchart') // get the image in a buffer 
        .then(function (data) {
          fs.writeFileSync('aaaa.png', data)
        })


//###################### start 
server.use(express.static(ServerConfig.WEBROOT))

server.listen(ServerConfig.WWW_PORT, '0.0.0.0', function() {
	console.log('App listening on port '+ServerConfig.WWW_PORT)
	console.log('Press Ctrl+C to quit.')
})
