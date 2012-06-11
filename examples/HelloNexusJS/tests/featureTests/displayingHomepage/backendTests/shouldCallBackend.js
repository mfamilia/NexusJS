define([
	'jquery',
	"Nexus",
	'app/features/displayingHomepage/behavior/eventHandlers/homePageDisplayedBackEndHandler'
], function ($, Nexus, homePageDisplayedBackEndHandler) {


	var givenEvent = {
		id: 123,
		date: new Date,
		eventName: 'Home page displayed'
	}

	var expectedBackendCall = new Nexus.BackendCall({
		type: 'POST',
		url: 'http://192.168.0.134:3000',
		data: {'text':'Homepage Displayed'}
	});

	return new Nexus
	.BackendTest('Should call backend')
		.GivenEvent(givenEvent)
		.WhenHandledBy(homePageDisplayedBackEndHandler)
		.ThenExpectBackendCall(expectedBackendCall);
			   
});


