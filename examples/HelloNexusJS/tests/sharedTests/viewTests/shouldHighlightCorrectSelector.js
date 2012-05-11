define([
	'jquery',
	"Nexus",
	'app/shared/behavior/eventHandlers/highlightedHandler'
], function ($, Nexus, highlightedHandler) {
	
	var highlightedEvent = {
		selector: '#thingToSay',
		eventName: 'Highlighted'
	};
	
	var expectedView = {
		onLoad: 
		function(){
			$(evt.selector).removeClass().addClass('highlighted'); 
		}									
	};

	return new Nexus
	.ViewTest('Should highlight correct selector')
		.GivenEvent(highlightedEvent)	
		.GivenEventHandler(highlightedHandler)
		.ExpectOnLoad(expectedView.onLoad);
			   
});
