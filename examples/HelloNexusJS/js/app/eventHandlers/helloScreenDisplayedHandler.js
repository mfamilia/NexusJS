define([
	"Nexus",
	"app/events/helloScreenDisplayed"
], function (Nexus, HelloScreenDisplayed) {
	
	return new Nexus.EventHandler(
		'Hello screen displayed event handler',
		HelloScreenDisplayed.eventName,
		function(evt){
			
			new Nexus.View({
				template: 'helloTemplate.html',
				placeholder: '#output'
			})
			.render();
			
		}	
	);
	
});
