define([
	"Nexus",
	'app/features/displayingHomepage/behavior/events/homePageDisplayed'
], function (Nexus, homePageDisplayed) {

	return {
		register: function(){
			Nexus.Router.registerRoute('#home',[homePageDisplayed.Event()]);
		}
	};
	
});
