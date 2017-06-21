// should be loaded from main, from now it is in from setup, including polyfills
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

	, readTemplateEl: function(thiz, templ) {
		//TW.regC('template-el', Object.create(HTMLElement.prototype));
		if (window.HTMLTemplateElement.bootstrap) 
            window.HTMLTemplateElement.bootstrap(thiz)
        var script = document.querySelector(templ)
        var template = document.createElement('template')
        template.id = script.id
        template.innerHTML = script.text
        script.parentNode.replaceChild(template, script)
	}

	, _attachShadow: function(thiz, templ) {
		var templateElement = document.querySelector(templ)
        var clone = document.importNode(templateElement.content, true);
		//var shadow = this.createShadowRoot() NOPE
		var shadow = thiz.attachShadow({mode: 'open'})
		shadow.appendChild(clone)
		return shadow
	} 	

	//IE-compatible version
	, attachShadow: function(thiz, templ) {
        //https://github.com/manubb/template
        TW.readTemplateEl(thiz, templ)

        return TW._attachShadow(thiz, templ)
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
				console.log('TW loaded NotChrome CustomElements and shadydom')
				loadjs.done('NotChrome')
			}//, async: false
		})
	}

}
