define([
	'jquery',
	"Nexus",
	'app/features/displayingHomepage/eventHandlers/homePageDisplayedBackEndHandler'
], function ($, Nexus, homePageDisplayedBackEndHandler) {


	var givenEvent = {
		id: 123,
		date: new Date,
		eventName: 'Home page displayed'
	}

	var expectedPayload = {
		url: 'http://www.google.com',
		data: {'key':'value'}
		// optionally...
		//,success: function(data){console.log(data)}
		//,error: function(){}
	};

	return new Nexus
	.BackendTest('Should call backend')
		.GivenEvent(givenEvent)
		.GivenEventHandler(homePageDisplayedBackEndHandler)
		.ExpectType('POST')
		.ExpectPayload(expectedPayload);
			   
});


