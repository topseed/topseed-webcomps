'use strict'

class ServerConfig {
	get WEBROOT() {return 'root2'}
	get SSR_PORT() {return 9080}
	get WWW_PORT()  {return 9981}
	get PUG_EXCLUDE() {return []}
	
} module.exports = ServerConfig