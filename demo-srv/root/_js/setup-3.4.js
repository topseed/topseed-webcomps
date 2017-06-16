// in 'main.js': TS.signalAppReady() // app ready sent 
/*ex pg use:
	TS.onAppReady(UIinit)

	function UIinit() {
	}
*/
//'use strict'  // NOT in IE 11 w/ Class we can't

var TS = { //class:
	load: function(lib, xfoo) { //load and exec
		loadjs([ lib ], // now load ps
			{ success: function(){ 
				xfoo()
			} 
			})//load ps.js	
	}//()

	, signalAppReady: function() {
		TS.appReady = true
	}

	, appReady: false

	, onAppReady: function(pinit) {
		if(TS.appReady) {
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
			TS.load(lib, pinit)
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

			,'https://cdn.rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-3.0.js'

			], { success: function(){
				console.log('keyLibs') 

				// if ('undefined' == typeof window.jQuery) {
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


/* Add support for IE11
 http://johnresig.com/blog/simple-javascript-inheritance
 * By John Resig https://johnresig.com/
 * Modified by Andrew Bullock http://blog.muonlab.com to add static properties 
 * MIT Licensed.
 */
var initializingClass = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

// The base Class implementation (does nothing)
this.Class = function(){}

// Create a new Class that inherits from this class
Class.extend = function(prop) {
	var _super = this.prototype;
		
	// Instantiate a base class (but only create the instance,
	// don't run the init constructor)
	initializingClass = true;
	var prototype = new this();
	initializingClass = false;

    // Added: copy static properties from base
    for (var name in this) {
        if (name.substr(0, 1) == '_')
            Class[name] = this[name];
    }
		
	// Copy the properties over onto the new prototype
    for (name in prop) {
        // Check if we're overwriting an existing function
        if (typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name])) {
            prototype[name] = (function(name, fn) {
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]);
        } else if (name.substr(0, 1) == '_') {
            Class[name] = prop[name];
        } else {
            prototype[name] = prop[name];
        }
    }		
	// The dummy class constructor
	function Class() {
		// All construction is actually done in the init method
		if ( !initializingClass && this.init )
		this.init.apply(this, arguments);
	}
		
	// Populate our constructed prototype object
	Class.prototype = prototype;
		
	// Enforce the constructor to be what we expect
	Class.prototype.constructor = Class;

	// And make this class extendable
	Class.extend = arguments.callee;
		
	return Class
}


// COMPS ////////////////////////////////////////////////////////////////////////////////////////
var TW = { //class:
	_loadedComp : {'exComp': true} // don't load 2x
	, loadComp: function(url, $here, callbackFunc) { //load template, don't forget #comps
		if(url in TW._loadedComp) {//guard: we loaded it before, thank you very much
			console.log('already loaded')
			callbackFunc()
			return
		} else {
			fetch(url, {
				method: 'get'
			}).then(function(response) {
				if (!response.ok) {
					console.log('not ok')
					console.log(response)
					throw Error(response.statusText)
				}
				return response.text()
			}).then(function(txt) {
				console.log('loading (again?)')
				TW._loadedComp[url] = true
				$here.append( txt )
				callbackFunc()
			})
		}
	}//()

	, _isCReg: function(name) {
		return (window.creg && window.creg.hasOwnProperty(name))
		//	return window.creg[name]
		//return false
	}
	
	, _cReg: function(name, comp) { // register a component
		if (!window.creg)
			window.creg = {}
		console.log('creg', name)
		window.creg[name] = comp 
	}

	, register: function(tag, KlassEl) {//register class
		var xx
		if(!TW._isCReg(tag)) {
            if (tag.indexOf('-')==-1)
                throw 'Custom element name must contain a - (dash)!'  
			xx = document.registerElement(tag, {prototype: KlassEl})
			TW._cReg(tag, xx)
		}
		console.log(window.creg)
		xx = TW._isCReg(tag)	
		return xx
	}

	, attach: function (thiz, templ) {
		var t = document.querySelector(templ)
		var clone = document.importNode(t.content, true)
		//var shadow = this.createShadowRoot() NOPE
		var shadow = thiz.attachShadow({mode: 'open'})
		shadow.appendChild(clone)
		return shadow
	}


	, bind: function (tpl, data) { // take tmpl and bind w/ data
		var tpl1Foo = doT.template(tpl)
		return tpl1Foo(data)
	}
}

