// in 'main.js': TS.signalAppReady() // app ready sent 
/*ex pg use:
	TS.onAppReady(UIinit)

	function UIinit() {
	}
*/
//'use strict'  // NOT in IE 11 w/ Class we can't

//polyfill for _load endsWith
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(searchString, position) {
		var subjectString = this.toString()
		if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
			position = subjectString.length
		}
		position -= searchString.length
		var lastIndex = subjectString.lastIndexOf(searchString, position)
		return lastIndex !== -1 && lastIndex === position
	}
}

var TS = { //class:

	_load: function(url, resolve, reject){
		var isCss = url.toLowerCase().endsWith('.css')
		var el = document.createElement(isCss?'link':'script')
		el.onload = function(){ //IE9 min
			resolve(url)
		}
		el.onerror = function(){ 
			reject(url)
		}
		if (isCss)
		{
			console.log('_loadCss:'+url)
			el.href = url
			el.type = 'text/css'
			el.rel = 'stylesheet'
			var ref = window.document['head'].appendChild(el)
			console.log('_loadCss done')
		}
		else {
			console.log('_load:'+url)
			el.src = url
			el.async = true
			var ref = window.document.getElementsByTagName('script')[0]
			ref.parentNode.insertBefore(el, ref)
		}
	}

	, load: function(url){
		return new Promise(function (resolve, reject) {
			TS._load(url, resolve, reject)
		})
	}

	, appReady: false

	, signalAppReady: function() {
		TS.appReady = true
	}

	, onAppReady: function(pinit) {
		if (TS.appReady  && 'undefined' != typeof jQuery) { // wait for libs loaded.
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
		if (bowser.msie || !bowser.a)
		{
			return Promise.all([
				TS.load('//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js')
				, TS.load('//cdn.jsdelivr.net/picturefill/3.0.3/picturefill.min.js')
			])
		}	
		return Promise.resolve('isNotIE')
	}

	, loadKeylibs: function() {
		return Promise.all([
			TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/vendor/js.cookie.min.js')
			, TS.load('//unpkg.com/topseed-util@24.0.0/PLX.js') // key part for comp com
		])
	}

	, loadFRPAndBowser: function() {
		return Promise.all([
			TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/vendor/flyd.min.js')
			, TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bowser.min.js').then(TS.loadIE)
			, TS.loadKeylibs()
		])
		.then(function(){TS.load('/_js/main.js')});
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


window.onbeforeunload = function (e) {
	console.log('please come back soon')
}