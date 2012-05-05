define([
	"Nexus",
	'app/features/displayingHomepage/events/homePageDisplayed'
], function (Nexus, homePageDisplayed) {

	return {
		register: function(){
			Nexus.Router.registerRoute('#home',[homePageDisplayed]);		
		}
	};
	
});
