define([
	'Nexus',
	'app/stories/ViewTweets/behavior/events/TweetsShown'
], function (Nexus, TweetsShown) {	
		
	var expectedEvents = [
		TweetsShown.Event()
	];

	// given a route, expect events to be published
	return new Nexus
	.ResolveRouteTest('Should resolve Tweets shown route')
		.GivenRoute('#ViewTweets/TweetsShown')
		.ExpectEvents(expectedEvents);
			   
});
