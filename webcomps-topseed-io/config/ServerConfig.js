'use strict'

class ServerConfig {
	get WEBROOT() {return 'public'}
	get WWW_PORT()  {return 9981}
	get PUG_EXCLUDE() {return []}
	
} module.exports = ServerConfig