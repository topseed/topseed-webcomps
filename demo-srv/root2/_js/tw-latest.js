// should be loaded from main, from now it is in from setup, including polyfills
// COMPS ////////////////////////////////////////////////////////////////////////////////////////
var TW = { //class:
	_loadedComp : {'exComp': true} // don't load 2x
    , loadCompPromise : function(url, $here){
        return new Promise(function (resolve, reject){
            if (url in TW._loadedComp) {//guard: we loaded it before, thank you very much
                console.log('already loaded')
                //callbackFunc()
                resolve(JSON.stringify('OK'))
                
            } else {
                fetch(url, {
                    method: 'get'
                }).then(function(response) {
                    if (!response.ok) {
                        console.log('not ok')
                        console.log(response)
                        //throw Error(response.statusText)
                        reject(new Error('Invalid token'))
                    }
                    console.log('returning response.text()'+response.text())
                    //return response.text()
                    resolve(response.text())
                }).then(function(txt) {
                    TW._loadedComp[url] = true
                    console.log('loading (again?)1,  if error in IE, then not es5:', url)
                    $here.append( txt )
                    console.log('loading (again?)2!')

                    //callbackFunc()
                    resolve(JSON.stringify('OK'))
                })
            }
        })    
    }

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
				TW._loadedComp[url] = true
				console.log('loading (again?)1,  if error in IE, then not es5:', url)
				$here.append( txt )
				console.log('loading (again?)2!')

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

	, registerCustomElement: function(tag, KlassEl) {//register class
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

	, regC: function(tag, KlassEl) {
		return TW.registerCustomElement(tag, KlassEl)
	}	

	, attachShadow: function(thiz, templ) {
		var templateElement = document.querySelector(templ)
        var clone = document.importNode(templateElement.content, true);
		
		/*catch (e) { //IE
            console.log('handling IE importNode')
			var wrapper = document.createElement('div'),
				fragment = document.createDocumentFragment();
			wrapper.innerHTML = templateElement.innerHTML;
			while (wrapper.firstChild) {
				var child = wrapper.removeChild(wrapper.firstChild);
				fragment.appendChild(child);
			}
			clone = fragment;
		}*/

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