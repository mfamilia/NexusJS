define([
	"jquery",
	"Nexus",
	"app/shared/behavior/events/errorRaised"
], function ($, Nexus, ErrorRaised) {
	
	return new Nexus.EventHandler(
		'Error raised event handler',
		ErrorRaised.eventName,
		function(evt){

			new Nexus.View({
				template: 'app/shared/ui/templates/errorTemplate.html',
				placeholder: '#output',
				data: evt			
			})
			.render();
		
		}	
	);
	
});
