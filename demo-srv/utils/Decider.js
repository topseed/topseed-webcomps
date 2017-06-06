const fs = require('fs')
const pug = require('pug')

const useragent = require('useragent')
const isj = require('is_js')
const Util = require('topseed-util')
const U = new Util() 

useragent(true)

// ###################### middle filter
const ROOT = './' + ServerConfig.WEBROOT

const _slash = '/'
function endsWithSlash(str ) {
	if (isj.endWith(str,_slash)) 
		return str
	return str+_slash
}

function ifError(err, msg, res) {
	if (err)  {
		console.log(msg+': ' + err)
		res.redirect('/index.html')// error - go home
		res.end()
		return true
	} else return false
}

//**************** */
exports.decide = function (req, res, next) {//decide based on port
	res.header('X-TimeSent', U.getDt() )
	U.cacheLong(res) // default is long, later we set to quick if needed	
	if (req.path.indexOf('.') > 0 ) { // hasDot?
		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
		try {
			console.log(req.socket.localPort)

			const pgPath = U.getPath(ROOT,req)
			console.log('requested:'+pgPath )
			const requestedResource = pgPath + '.pug'

			res.header('Content-Type', 'text/html')
			U.cacheQuick(res)

			const html = pug.renderFile(requestedResource)
			res.send(html)

		} catch(err) {
			ifError(err, 'catch', res)
		}
	}

}//()

