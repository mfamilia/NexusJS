define([
	'jquery',
	'Nexus',
	"app/features/displayingHomepage/behavior/events/homePageDisplayed"
], function ($, Nexus, HomePageDisplayed) {
	
	return new Nexus.EventHandler(
		'Home page displayed event handler for backend calls',
		HomePageDisplayed.eventName,
		function(evt){											
			
			Nexus.BackendCall(new Nexus.BackendCall({
				type: 'POST',
				url: 'http://192.168.0.134:3000',
				data: {'text':'Homepage Displayed'}
			}))
			.perform();
		}	
	);
	
});
