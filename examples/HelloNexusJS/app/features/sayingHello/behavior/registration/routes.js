define([
	"Nexus",
	'app/features/sayingHello/behavior/events/helloScreenDisplayed'
], function (Nexus, helloScreenDisplayed) {

	return {
		register: function(){
			Nexus.Router.registerRoute('#say/hello',[helloScreenDisplayed.Event()]);
		}
	};
	
});
