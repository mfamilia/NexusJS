define([
	'jquery',
	"Nexus",
	"app/shared/behavior/events/errorRaised",
	'app/shared/behavior/eventHandlers/errorRaisedHandler'
], function ($, Nexus, ErrorRaised, errorRaisedHandler) {
	
	var givenEvent = ErrorRaised.Event('some error message');
	
	var expectedView = new Nexus.View({
		template: 'app/shared/ui/templates/errorTemplate.html',
		placeholder: '#output',
		data: givenEvent			
	});

	return new Nexus
	.ViewTest('Should render error correctly')
		.GivenEvent(givenEvent)	
		.WhenHandledBy(errorRaisedHandler)
		.ThenExpectView(expectedView);
			   
});
