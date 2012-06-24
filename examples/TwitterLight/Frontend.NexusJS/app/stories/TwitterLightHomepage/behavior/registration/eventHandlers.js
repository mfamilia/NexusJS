define([
    'Nexus',
    'app/stories/TwitterLightHomepage/behavior/eventHandlers/ShowHomepageViewEventHandler'
], function (
	Nexus,
	ShowHomepageViewEventHandler
    ){

	return {
		register: function(){
			Nexus.EventBus.registerEventHandlers([
				ShowHomepageViewEventHandler
			]);
		}
	}


});


