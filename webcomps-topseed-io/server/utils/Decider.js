const fs = require('fs')
const pug = require('pug')

const isj = require('is_js')

const Util = require('topseed-utils')
const U = new Util() 

// ###################### middle filter
const ROOT = './' + ServerConfig.WEBROOT

/*const _slash = '/'
function endsWithSlash(str ) {
	if (isj.endWith(str,_slash)) 
		return str
	return str+_slash
}
*/

var options = {}
options.pretty = true

function pugComp(req,res) {
	var pgPath = U.getPath(ROOT,req)
	
	const ignore = pathContains(pgPath, ServerConfig.PUG_EXCLUDE)
	
	//U.getPath appends a trailing slash, for linux we need to remove it.
	if (isj.endWith(pgPath,'/')) {
		pgPath = pgPath.substring(0, (pgPath.length)-1)
	}

	const requestedResource = U.replace(pgPath, '.html', '.pug')
	res.header('Content-Type', 'text/html')
	U.cacheQuick(res)
	if (!ignore && fs.existsSync(requestedResource)) {
		console.log('requested:'+requestedResource )
		const html = pug.renderFile(requestedResource, options)
		res.status(200).send( html).end()
	} else {
		fs.readFile(pgPath, 'utf8', function(err, data) {
			res.send(data).end()
		})
	}
}

function pathContains(path, arr)
{
	if (!arr) return false
	for (i = 0; i < arr.length; i++) {
		if (path.indexOf(arr[i])> -1) return true
	}
	return false			
}

//**************** */
exports.decide = function (req, res, next) {//decide based on port
	res.header('X-TimeSent', U.getDt() )
	U.cacheLong(res) // default is long, later we set to quick if needed	
	if (req.path.indexOf('.') > 0 ) { // hasDot?
		if(req.path.indexOf('.html') > 0) {
			pugComp(req, res)
		} else
		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
		try {
			//console.log(req.socket.localPort)

			const pgPath = U.getPath(ROOT,req)
			console.log('requested:'+pgPath )
			const requestedResource = pgPath + 'index.pug'

			res.header('Content-Type', 'text/html')
			U.cacheQuick(res)

			const html = pug.renderFile(requestedResource, options)
			res.status(200).send( html).end()

		} catch(err) {
			console.log('err', err)
		}
	}
}//()

