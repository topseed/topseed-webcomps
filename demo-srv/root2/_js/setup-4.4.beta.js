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

	, load: function(url){
		return new Promise(function (resolve, reject) {
			TS._load(url, resolve, reject)
		})  
	}

	, ready: function(keyArr, func)
	{
		if (!TS._loadStream)
			TS._loadStream = flyd.stream()
		var mapContainsArray = function(superset, subset) {
			if (0 === subset.length) {
				return false
			}
			return subset.every(function (value) {
				return (superset[value]!=null)
			})
		}	
		var filter = function(key){
			TS._loadStream[key] = key //persist the key
			if (mapContainsArray(TS._loadStream, keyArr)) {
				func()
			}
		}
		flyd.on(filter, TS._loadStream) //bind	
	}

	, done: function(key){
		if (!TS._loadStream)
			TS._loadStream = flyd.stream()
		TS._loadStream(key) //exec
	}

	, signalAppReady: function() {
		TS.appReady = true
	}

	, appReady: false

	, onAppReady: function(pinit) {
		if (TS.appReady) { // wait for libs loaded.
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

 	, loadJQuery: function() { 
		 return TS.load('//code.jquery.com/jquery-3.2.1.slim.min.js')
		 .then(function(){TS.done('jQuery')})
	 }	 

 	, loadIE: function() { 
		if (!bowser.msie && bowser.a)
			return Promise.resolve('NotIE')
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

	, loadPolyfills: function(){
		return Promise.all([
			TS.loadIE(), TS.loadNotChrome()
		])
		.then(function(){TS.done('polyfills')})
		
	}
	, loadKeylibs: function() {
		return Promise.all([
			TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/js.cookie.min.js')
			, TS.load('//cdn.jsdelivr.net/dot.js/1.1.1/doT.min.js') 
			, TS.load('https://unpkg.com/topseed-util@24.0.0/PLX.js') // key part for comp com
		])
		.then(function(){TS.done('keyLibs')})
	}

	, loadFRPAndBowser: function() {
		return Promise.all([
			TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/flyd.min.js')
			, TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bowser.min.js')
		])
		.then(function(){Promise.all([
				TS.loadPolyfills()
				, TS.loadKeylibs()
				, TS.loadJQuery()
				, TS.load('/_js/main.js')
			])
		})	
	}

	, loadPromise: function() {
		if (!window.Promise)
			TS._load('//cdn.jsdelivr.net/es6-promise-polyfill/1.2.0/promise.min.js', TS.loadFRPAndBowser)
		else
			TS.loadFRPAndBowser() 
	}

}//class

// load stuff:
TS.loadPromise() //etc

//bower install Polymer/polymer#^1.0.0

window.onbeforeunload = function (e) {
	console.log('please come back soon')
}
