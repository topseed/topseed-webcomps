'use strict'
console.log('main')

//requires setup-5.1.js or higher
function loadLibs(){

	//most of these could be in manifest
	return Promise.all([
		TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/vendor/jquery.jsForm.min.js')
		, TS.load('//cdn.jsdelivr.net/dot.js/1.1.1/doT.min.js')
		, TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/webComps/tw0-1.0.js').then(function(){TW.init()}) //Support for Standard Web Component
		, TS.load('//cdn.jsdelivr.net/riot/3.4.4/riot+compiler.min.js') //Support for RIOT
		, TS.load('//rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-latest.js')
		, TS.load('/_js/BLX.js')
		, TS.load('/_js/BDS.js')
	])
	.then(function(){
		TS.signalAppReady()

		TT.ScontentID ='#content-wrapper'
		TT.handle(function(evt) {
			console.log(':')
			if (TT.PRE == evt.typ)  {//start
				console.log(evt.$new)
				//$('#content-wrapper').fadeTo(100,.2)
			}
			if (TT.PAGE == evt.typ)  {//new pg loaded
				$(TT.ScontentID).html(evt.$new)
				//$('#content-wrapper').fadeTo(100,1)
			}
		})
	})	
}

TS.ready(['polyfills', 'keyLibs'], loadLibs)



