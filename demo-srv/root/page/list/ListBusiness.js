function ListBusiness() {// 'closure|module'-iso.

	const urlSpec = {root:'http://localhost:9081', selectList: '/page/list/dummy.json'}

	var SiteListDao = BDS.extend({}) 
	
	var SimpleBusiness = BLX.extend({

        list: function(listId, templateId) {
			sb.siteListDao.selectList().then(function(values) {
                    //http://www.javascriptoo.com/dot-js
                    var templateText = document.getElementById(templateId).text
                    var templateFunction = doT.template(templateText)
                    document.getElementById(listId).innerHTML = templateFunction({'array': values})

                }).catch(function(error) {
			  		console.log('ListBusiness.selectList error: '+error.message);
				}
            );  
		}

        , compList: function(componentName) {
			sb.siteListDao.selectList().then(function(values) {

                    var comp = document.querySelector(componentName) //good if only one
                    comp.list(values)

                }).catch(function(error) {
			  		console.log('ListBusiness.selectList error: '+error.message);
				}
            );  
		}

        , compInit: function(componentName) {
            var comp = document.querySelector(componentName)
            comp.init(sb) //pass in sb as message bus
        }

	})//'class'

	//Instantiate Business
	const sb = new SimpleBusiness()
	sb.siteListDao = new SiteListDao(urlSpec) //Add DAO to Business
	
	return sb //Return instance to page 
}