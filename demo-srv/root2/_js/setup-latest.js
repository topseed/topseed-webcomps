
// in 'main.js': TS.signalAppReady() // app ready sent 
/*ex pg use:
	TS.onAppReady(UIinit)

	function UIinit() {
	}
*/
//'use strict'  // NOT in IE 11 w/ Class we can't

var TS = { //class:
	loadOld: function(lib, xfoo) { //load and exec
		loadjs([ lib ], // now load ps
			{ success: function(){ 
				xfoo()
			} 
			})//load ps.js	
	}//()

    ,load: function(lib) { //load and exec
        return new Promise(function (resolve, reject){
			loadjs([ lib ], // now load ps
                { success: function(){ 
                    resolve('OK')
                } 
			})//load ps.js	
		})
	}//()

	, signalAppReady: function() {
		TS.appReady = true
	}

	, appReady: false

	, onAppReady: function(pinit) {
		if(TS.appReady && 'undefined' != typeof window.jQuery) { // wait for jQuery and libs loaded. jq should be in mainfest.
			console.log('app-ready!')
			pinit()
		} else {
			setTimeout(function() {//wait X milliseconds then loop and recheck if ready
				console.log(',') // likey TS.signalAppReady() was not called
				TS.onAppReady(pinit)//loop
			} ,60)
		}//else
	}//()

	, loadOnAppReady: function(lib, pinit){
		if(TS.appReady) {
			console.log('main?')
			TS.load(lib).then(pinit)
		} else {
			setTimeout(function() {//wait X milliseconds then loop and recheck if ready
				console.log(',') // likey TS.signalAppReady() was not called
				TS.loadOnAppReady(lib, pinit)//loop
			} ,60)
		}//else
	}

	, loadIE: function() { 
		loadjs([
			'//cdn.jsdelivr.net/es6-promise-polyfill/1.2.0/promise.min.js'
			,'//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js'
			,'//cdn.jsdelivr.net/picturefill/3.0.3/picturefill.min.js'

			//https://github.com/manubb/template
			,'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/template.js'
		
			], { success: function(){
				console.log('loaded IE')
				loadjs.done('IE')
			}//, async: false
		})
	}
	, loadNotChrome: function() {
		loadjs([
			'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bower_components/webcomponentsjs/CustomElements.min.js'
			,'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/shadydom.min.js'

			], { success: function(){
				console.log('loaded NotChrome')
				loadjs.done('NotChrome')
			}//, async: false
		})
	}
}//class


// load stuff:
loadjs([ // load bowser, should be in cache manifest 
	'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bowser.min.js'
	], { success: function(){

			console.log('bowser')
			if(bowser.msie||!bowser.a) { // ie or worse
				console.log('you got IE, not Edge.')
				TS.loadIE()
			} else {
				loadjs.done('IE')
			}
			
			if(!bowser.blink) {
				console.log('NotChrome')
				TS.loadNotChrome()
			} else {
				loadjs.done('NotChrome')
			}

	}
})

//bower install Polymer/polymer#^1.0.0

//load the needed libs
loadjs([ // should be in cache manifest 
	'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/flyd.min.js'
	], { success: function(){
		loadjs([// these should be in cache manifest 
			'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/js.cookie.min.js'
			,'//cdn.jsdelivr.net/dot.js/1.1.1/doT.min.js' 

			//https://www.npmjs.com/package/topseed-util
			,'https://unpkg.co/topseed-util@24.0.0/PLX.js' // key part for comp com

			//,'https://rawgit.com/topseed/topseed-turbo/master/webComps/tw-latest.js'// could be optional, loaded from main.
            ,'/_js/tw-latest.js'// could be optional, loaded from main.

			,'https://rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-latest.js' // could be optional

			], { success: function(){
				console.log('keyLibs') 

				loadjs.done('keyLibs')

			}//, async: false
		})
	}
})

loadjs.ready(['IE','NotChrome'], {// polyfills
	success: function(){
		console.log('polyfills')
		loadjs.done('polyfills')
	}//suc
})

window.onbeforeunload = function (e) {
	console.log('please come back soon')
}

