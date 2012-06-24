define([
	'Nexus',
	'app/stories/PostATweet/behavior/events/ThanksForYourTweetPageShown'
], function (Nexus, ThanksForYourTweetPageShown) {	
		
	var expectedEvents = [
		ThanksForYourTweetPageShown.Event("Message","Tweet")
	];

	// given a route, expect events to be published
	return new Nexus
	.ResolveRouteTest('Should resolve Thanks for your tweet page shown route')
		.GivenRoute('#PostATweet/ThanksForYourTweetPageShown/[Tweet]/[Message]')
		.ExpectEvents(expectedEvents);
			   
});
