//requires setup-6.0.js or higher
var TM = {

	loadLibs: function(){
		console.log('loadLibs called')

		//most of these could be in cache.mf
		return Promise.all([
			TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/vendor/jquery.jsForm.min.js')
			, TS.load('//cdn.jsdelivr.net/dot.js/1.1.1/doT.min.js')
			, TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/webComps/tw-4.1.js').then(function(){TW.init()}) //Support for Standard Web Components
			, TS.load('//cdn.jsdelivr.net/riot/3.4.4/riot+compiler.min.js') //Support for RIOT
			, TS.load('//rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-latest.js')
			, TS.load('/_js/BLX.js')
			, TS.load('/_js/BDS.js')
			//, TS.load('/_js/vendor/apply-shim.min.js')
			//, TS.load('/_js/vendor/custom-style-interface.min.js')
			//, TS.load('/_js/vendor/scoping-shim.min.js')
		])
		.then(TM.libsLoaded)
	}

	, libsLoaded: function(){
		
		TS.signalAppReady()

		TT.ScontentID = '#content-wrapper'
		TT.handle(function(evt) {
			if(TT.PRE == evt.typ)  {
				//$('#content-wrapper').fadeTo(100,.2)
			}
			if(TT.PAGE == evt.typ)  {
				$(TT.ScontentID).html(evt.$new)
			}
		})
	}

} //class

TM.loadLibs()






