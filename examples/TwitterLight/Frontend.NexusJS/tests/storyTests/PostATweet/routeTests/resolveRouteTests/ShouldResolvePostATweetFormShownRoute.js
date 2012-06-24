define([
	"Nexus",
	"app/stories/PostATweet/behavior/events/PostATweetFormShown"
], function (Nexus, PostATweetFormShown) {	
		
	var expectedEvents = [
		PostATweetFormShown.Event()
	];

	// given a route, expect events to be published
	return new Nexus
	.ResolveRouteTest('Should resolve Post a tweet form shown route')
		.GivenRoute('#PostATweet/PostATweetFormShown')
		.ExpectEvents(expectedEvents);
			   
});
