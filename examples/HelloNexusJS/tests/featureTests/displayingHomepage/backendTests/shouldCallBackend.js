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
		url: 'http://192.168.0.134:3000',
		data: {'text':'Homepage Displayed'}
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


