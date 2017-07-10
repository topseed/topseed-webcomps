loadjs.ready(['polyfills', 'keyLibs'], {// loaded setup libs
	success: function(){
	loadjs([
		'/_js/BLX.js'
		, '/_js/BDS.js'

		], { success: function(){
			libsLoaded()
		}
	})//loadjs
	}//suc
})

//========================================================
function libsLoaded(){
	
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
