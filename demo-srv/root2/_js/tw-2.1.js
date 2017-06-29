// should be loaded from main, from now it is in from setup, including polyfills
// COMPS ////////////////////////////////////////////////////////////////////////////////////////
var TW = { //class:
	_loadedComp : {'exComp': true} // don't load 2x

    , loadComp : function(url, $here){
        return new Promise(function (resolve, reject){
            if (url in TW._loadedComp) {//guard: we loaded it before, thank you very much
                console.log('already loaded')
                resolve("OK2")
            } else {
			    fetch(url, {
                    method: 'get'
                }).then(function(response) {
                    if (!response.ok) {
                        console.log('not ok')
                        console.log(response)
                        reject(response.statusText)
                    } 
                    return response.text()
                }).then(function(txt) {
					registerComp = function(){} //null function	
                    TW._loadedComp[url] = true
					console.log('loading (again?)1,  if error in IE, then not es5:', url)
                    $here.append(txt)
					//generic register, standard component must implement
					registerComp()
                    console.log('loading (again?)2!')
                    resolve("OK")
                })    
			}
        })    
    }

	, _isCReg: function(name) {
		return (window.creg && window.creg.hasOwnProperty(name))
		//	return window.creg[name]
		//return false
	}
	
	, _cReg: function(name, comp) { // register a component
		if (!window.creg)
			window.creg = {}
		window.creg[name] = comp 
	}

	, registerComp: function(tag, KlassEl) {//register class
		var xx
		if(!TW._isCReg(tag)) {
			if (tag.indexOf('-')==-1)
				throw 'Custom element name must contain a - (dash)!'  
			xx = document.registerElement(tag, {prototype: KlassEl})
			TW._cReg(tag, xx)
		}
		xx = TW._isCReg(tag)	
		return xx
	}

	, regC: function(tag, KlassEl) {
		return TW.registerComp(tag, KlassEl)
	}	

	, attachShadow: function(thiz, templ) {
		var templateElement = document.querySelector(templ)
        var clone = document.importNode(templateElement.content, true);

		//var shadow = this.createShadowRoot() NOPE
		var shadow = thiz.attachShadow({mode: 'open'})
		shadow.appendChild(clone)
		return shadow
	}

	, attS: function(thiz, templ){
		return TW.attachShadow(thiz, templ)
	}

	, bind: function (tpl, data) { // take tmpl and bind w/ data
		var tpl1Foo = doT.template(tpl)
		return tpl1Foo(data)
	}

    //not used yet, see setup-latest.js    
	, loadNotChrome: function() { // this and IE template allows for comps to be here
		loadjs([
			'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/bower_components/webcomponentsjs/CustomElements.min.js'
			,'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/shadydom.min.js'

			], { success: function(){
				console.log('loaded NotChrome')
				loadjs.done('NotChrome')
			}//, async: false
		})
	}
}
