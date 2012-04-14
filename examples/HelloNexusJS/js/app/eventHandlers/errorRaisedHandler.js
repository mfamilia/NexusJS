define([
	"jquery",
	"Nexus",
	"app/events/errorRaised"
], function ($, Nexus, ErrorRaised) {
	
	return new Nexus.EventHandler(
		'Error raised event handler',
		ErrorRaised.eventName,
		function(evt){

			new Nexus.View({
				template: 'errorTemplate.html',
				placeholder: '#output',
				data: evt			
			})
			.render();
		
		}	
	);
	
});
