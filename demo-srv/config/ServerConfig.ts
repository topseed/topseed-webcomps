'use strict'

class ServerConfig {
	get WEBROOT() {return 'ROOT'}
	get SSR_PORT() {return 8080}
	get WWW_PORT() {return 8081}
	get IE_FORCE_SSR() {return false}

} export = ServerConfig