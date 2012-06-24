define([
	'Nexus',
	'app/stories/ViewTweets/behavior/events/TweetsShown'
], function (Nexus, TweetsShown) {	
	
	var givenEvents = [
		TweetsShown.Event()
	];

	// given events, expect to generate route
	return new Nexus
	.GenerateRouteTest('Should generate Tweets shown route')
		.GivenEvents(givenEvents)
		.ExpectRoute('#ViewTweets/TweetsShown');			   
});
