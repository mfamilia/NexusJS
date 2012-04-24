define([
	"Nexus",
	"app/features/sayingHello/events/helloScreenDisplayed"
], function (Nexus, HelloScreenDisplayed) {
	
	return new Nexus.EventHandler(
		'Hello screen displayed event handler',
		HelloScreenDisplayed.eventName,
		function(evt){
			
			new Nexus.View({
				template: 'app/features/sayingHello/templates/helloTemplate.html',
				placeholder: '#output'
			})
			.render();
			
		}	
	);
	
});
