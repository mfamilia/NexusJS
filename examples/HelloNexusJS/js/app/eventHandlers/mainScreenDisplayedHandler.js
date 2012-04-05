define([
	"Nexus",
	"app/events/mainScreenDisplayed"
], function (Nexus, MainScreenDisplayed) {
	
	return new Nexus.EventHandler(
		'Main screen displayed event handler',
		MainScreenDisplayed.eventName,
		function(evt){
			Nexus.App.UI.renderView('', 'mainScreen.html','#body');	
		}	
	);
	
});
