'use strict'
console.log('main')

loadjs.ready(['polyfills', 'keyLibs'], {// loaded setup libs
	success: function(){
		console.log('almost ready?')
		loadjs([
			//'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bower_components/shadydom/shadydom.min.js'
			//,'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bower_components/custom-elements/custom-elements.min.js'			
			'/_js/vendor/jquery.jsForm.min.js'

			], { success: function(){
				console.log('almost ready!')
				//window.addEventListener('WebComponentsReady', function() {
					console.log('WebComponentsReady')
					libsLoaded()
				//})
		}
		})//loadjs
	}//suc
})

function libsLoaded(){
	console.log('Loaded libs')
	
	TS.signalAppReady()

	TT.ScontentID ='#content-wrapper'
	TT.handle(function(evt) {
		console.log(':')
		if(TT.PRE==evt.typ)  {//start
			console.log(evt.$new)
			//$('#content-wrapper').fadeTo(100,.2)
		}
		if(TT.PAGE==evt.typ)  {//new pg loaded
			$(TT.ScontentID).html(evt.$new)
			//$('#content-wrapper').fadeTo(100,1)

		}
	})
}