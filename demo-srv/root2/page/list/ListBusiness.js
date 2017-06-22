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
            //if (1==1) return
			sb.siteListDao.selectList().then(function(values) {

                    console.log('got data')
                    var comp = document.querySelector(componentName) //good if only one
                    console.log('got component'+comp)
                    comp.list(values)

                }).catch(function(error) {
			  		console.log('ListBusiness.selectList error: '+error.message);
				}
            );  
		}

        , addComp: function(componentSelector) {
            var comp = document.querySelector(componentSelector)
            comp.init(sb) //pass in sb as message bus
        }

	})//'class'

	//Instantiate Business
	const sb = new SimpleBusiness()
	sb.siteListDao = new SiteListDao(urlSpec) //Add DAO to Business
	
	return sb //Return instance to page 
}