define([
	'jquery',
	'Nexus',
	"app/features/displayingHomepage/events/homePageDisplayed"
], function ($, Nexus, HomePageDisplayed) {
	
	return new Nexus.EventHandler(
		'Home page displayed event handler for backend calls',
		HomePageDisplayed.eventName,
		function(evt){											
			
			var payload = {
				url: 'http://192.168.0.134:3000',
				data: {'text':'Homepage Displayed'}
			};
			
			Nexus.jsonPOST(payload);
		}	
	);
	
});
