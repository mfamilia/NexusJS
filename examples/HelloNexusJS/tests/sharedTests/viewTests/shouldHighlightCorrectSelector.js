define([
	'jquery',
	"Nexus",
	"app/shared/behavior/events/highlighted",
	'app/shared/behavior/eventHandlers/highlightedHandler'
], function ($, Nexus, Highlighted, highlightedHandler) {
	
	var givenEvent = Highlighted.Event('#thingToSay');
	
	var expectedView = new Nexus.View({
		onLoad: 
		function(){
			$(evt.selector).removeClass().addClass('highlighted'); 
		}									
	});

	return new Nexus
	.ViewTest('Should highlight correct selector')
		.GivenEvent(givenEvent)	
		.WhenHandledBy(highlightedHandler)
		.ThenExpectView(expectedView);
			   
});
