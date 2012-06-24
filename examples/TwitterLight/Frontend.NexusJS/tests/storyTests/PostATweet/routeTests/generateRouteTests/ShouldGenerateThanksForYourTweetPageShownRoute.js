define([
	"Nexus",
	"app/stories/PostATweet/behavior/events/ThanksForYourTweetPageShown"
], function (Nexus, ThanksForYourTweetPageShown) {	
	
	var givenEvents = [
		ThanksForYourTweetPageShown.Event("Message","Tweet")
	];

	// given events, expect to generate route
	return new Nexus
	.GenerateRouteTest('Should generate Thanks for your tweet page shown route')
		.GivenEvents(givenEvents)
		.ExpectRoute('#PostATweet/ThanksForYourTweetPageShown/[Tweet]/[Message]');			   
});
