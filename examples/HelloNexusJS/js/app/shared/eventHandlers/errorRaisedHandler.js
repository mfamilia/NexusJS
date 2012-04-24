define([
	"jquery",
	"Nexus",
	"app/shared/events/errorRaised"
], function ($, Nexus, ErrorRaised) {
	
	return new Nexus.EventHandler(
		'Error raised event handler',
		ErrorRaised.eventName,
		function(evt){

			new Nexus.View({
				template: 'app/shared/templates/errorTemplate.html',
				placeholder: '#output',
				data: evt			
			})
			.render();
		
		}	
	);
	
});
