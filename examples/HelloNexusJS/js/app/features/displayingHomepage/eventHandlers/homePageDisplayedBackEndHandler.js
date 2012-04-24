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
				url: 'http://www.google.com',
				data: {'key':'value'}
			};
			
			Nexus.jsonPOST(payload);			
		}	
	);
	
});
