var BLX = Class.extend({ //IE11-compatible testable 'middle layer' Page Business base class for component communication, ds/fetch, FRP and such. 

	init: function(ds) { //ds should handdle all ds for that page
		this._ds = ds
		this._streams= {} 	//loosely coupled
		this.regObserver('TT', TT.smoothPg)//page stream
		this._redirectFoo = this.onRedirect // for SSR it would be different
	}

	, reg: function(key) {
		this._streams[key] = flyd.stream()
	}

	, on: function(key, func)
	{
		if (!this._streams[key])
			this.reg(key)
		flyd.on(func, this._streams[key]) //bind	
	}

	, emit: function(key, data) {
		if (!this._streams[key])
			this.reg(key)
		this._streams[key](data) //exec
	}

	, regObserver: function(key, stm)	{
		console.log('set')
		this._streams[key] = stm
	}

	, observer: function(key) {//get
		console.log('get')
		return this._streams[key]
	}

	 , redirect: function(url) { //Go to another page
		this._redirectFoo(url)
	 }

	 , onRedirect: function(url) {
		if (url.indexOf('#')==(url.length-1)) { //ends with
			console.log('refresh top, go to '+url)
			window.top.location.replace(url)
		}
		else
		{
			TT.loadPg(url)
		}
	 }
	

})//'class'

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BLX //node