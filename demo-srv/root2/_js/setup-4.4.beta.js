
// in 'main.js': TS.signalAppReady() // app ready sent 
/*ex pg use:
	TS.onAppReady(UIinit)

	function UIinit() {
	}
*/
//'use strict'  // NOT in IE 11 w/ Class we can't

var TS = { //class:

	_load: function(url, resolve, reject){
		var script = document.createElement('script')
		script.src = url
		script.async = true
		script.onload = function(){ //IE9 min
			resolve(url)
		}
		script.onerror = function(){ 
			reject(url)
		}
		var ref = window.document.getElementsByTagName('script')[0]
		ref.parentNode.insertBefore(script, ref)
    }

	,load: function(url){
		return new Promise(function (resolve, reject) {
			TS._load(url, resolve, reject)
		})  
    }

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
		if (!bowser.msie && bowser.a)
			return Promise.resolve('NotIE')
		//if (bowser.msie||!bowser.a) { //IE or worse
		else {	
			return Promise.all([
				TS.load('//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js')
				, TS.load('//cdn.jsdelivr.net/picturefill/3.0.3/picturefill.min.js')
				, TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/template.js')
			])
		}
	}
	, loadNotChrome: function() {
		if (bowser.blink)
			return Promise.resolve('IsChrome')
		else {
			return Promise.all([
				TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bower_components/webcomponentsjs/CustomElements.min.js')
				, TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/shadydom.min.js')
			])
		}
	}

	, loadBowser: function(){
		return TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bowser.min.js')
			.then(function(){Promise.all([
				TS.loadIE(), TS.loadNotChrome()
			])
		})
	}
	, loadKeylibs: function() {
		return Promise.all([
			TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/flyd.min.js')
			, TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/js.cookie.min.js')
			, TS.load('//cdn.jsdelivr.net/dot.js/1.1.1/doT.min.js') 
			, TS.load('https://unpkg.com/topseed-util@24.0.0/PLX.js') // key part for comp com
		])
	}

    , promiseLoaded: function() {
		loadjs.done('Promise')
		Promise.all([
			TS.loadBowser().then(function(){loadjs.done('polyfills')})
			, TS.loadKeylibs().then(function(){loadjs.done('keyLibs')})
		])
    }

   , loadPromise: function() {
        if (!window.Promise)
            TS._load('//cdn.jsdelivr.net/es6-promise-polyfill/1.2.0/promise.min.js', TS.promiseLoaded)
        else
            TS.promiseLoaded() 
    }

}//class

// load stuff:
TS.loadPromise() //etc

//bower install Polymer/polymer#^1.0.0

window.onbeforeunload = function (e) {
	console.log('please come back soon')
}
