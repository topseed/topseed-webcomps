'use strict'
loadjs.ready(['polyfills', 'keyLibs'], {// loaded setup libs
	success: function(){
		loadjs([
			'/_js/BDS.js'
			//,'/_js/BPS.js'

			], { success: function(){
				console.log('loaded')
				tst1()
			}
	})//loadjs
	}//suc
})

let ROOT = 'http://jsonplaceholder.typicode.com/'
function tst1() {
	// class:
	class Page1BDS extends BDS {
		doFetch() {
			return BDS.fetch(window.fetch, ROOT, 'comments')
				.then(function(value) { 
					console.log('back')
					console.log(JSON.stringify(value))
					return value
			})//BDS
		}//doFetch
	}//class
	const ds = new Page1BDS()
	QUnit.test( 'test: fetch()', function( assert ) {
		//assert.expect(1)
		const done = assert.async()

		const pro = ds.doFetch()
		pro.then(function(val) {
			console.log(val)
			assert.ok(true, 'we got data')
			done()

		}).catch(function (er) {
			console.log(er)
		})//c
	})//qu

}