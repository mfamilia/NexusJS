define([
	"Nexus",
	"app/features/sayingHello/behavior/events/helloScreenDisplayed",
	'app/features/sayingHello/behavior/eventHandlers/helloScreenDisplayedHandler'
], function (Nexus, HelloScreenDisplayed, helloScreenDisplayedHandler) {

	var givenEvent = HelloScreenDisplayed.Event();

	var expectedView = new Nexus.View({
		template: 'app/features/sayingHello/ui/templates/helloTemplate.html',
		placeholder: '#output'
	});

	return new Nexus
	.ViewTest('Should display hello screen', 300)
		.GivenEvent(givenEvent)
		.WhenHandledBy(helloScreenDisplayedHandler)
		.ThenExpectView(expectedView);
			   
});


