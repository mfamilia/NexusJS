define([
	"Nexus",
	'app/features/sayingHello/events/helloScreenDisplayed'
], function (Nexus, helloScreenDisplayed) {

	return {
		register: function(){
			Nexus.Router.registerRoute('#say/hello',[helloScreenDisplayed.Event()]);
		}
	};
	
});
