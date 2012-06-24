define([
	"Nexus",
	"app/stories/PostATweet/behavior/events/PostATweetFormShown"
], function (Nexus, PostATweetFormShown) {	
	
	var givenEvents = [
		PostATweetFormShown.Event()
	];

	// given events, expect to generate route
	return new Nexus
	.GenerateRouteTest('Should generate Post a tweet form shown route')
		.GivenEvents(givenEvents)
		.ExpectRoute('#PostATweet/PostATweetFormShown');			   
});
