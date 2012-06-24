define([
	'Nexus',
	'app/stories/PostATweet/behavior/events/SaveTweet'
], function (Nexus, SaveTweet) {	
	
	var givenEvents = [
		SaveTweet.Event()
	];

	// given events, expect to generate route
	return new Nexus
	.GenerateRouteTest('Should generate Save tweet route')
		.GivenEvents(givenEvents)
		.ExpectRoute('#PostATweet/SaveTweet');			   
});
