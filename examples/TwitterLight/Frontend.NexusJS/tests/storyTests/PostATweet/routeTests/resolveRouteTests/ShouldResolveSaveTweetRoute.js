define([
	'Nexus',
	'app/stories/PostATweet/behavior/events/SaveTweet'
], function (Nexus, SaveTweet) {	
		
	var expectedEvents = [
		SaveTweet.Event()
	];

	// given a route, expect events to be published
	return new Nexus
	.ResolveRouteTest('Should resolve Save tweet route')
		.GivenRoute('#PostATweet/SaveTweet')
		.ExpectEvents(expectedEvents);
			   
});
