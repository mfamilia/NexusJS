define([
	"jquery",
	"Nexus",
	"app/events/errorRaised"
], function ($, Nexus, ErrorRaised) {
	
	return new Nexus.EventHandler(
		'Error raised event handler',
		ErrorRaised.eventName,
		function(evt){
			Nexus.View
			.forTemplate('errorTemplate.html')
			.withData(evt)
			.renderOn('#output');			
		}	
	);
	
});
