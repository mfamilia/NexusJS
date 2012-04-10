define([
	"Nexus",
	"app/events/helloScreenDisplayed"
], function (Nexus, HelloScreenDisplayed) {
	
	return new Nexus.EventHandler(
		'Hello screen displayed event handler',
		HelloScreenDisplayed.eventName,
		function(evt){
			Nexus.App.UI.renderView('', 'helloScreen.html','#body');	
		}	
	);
	
});
