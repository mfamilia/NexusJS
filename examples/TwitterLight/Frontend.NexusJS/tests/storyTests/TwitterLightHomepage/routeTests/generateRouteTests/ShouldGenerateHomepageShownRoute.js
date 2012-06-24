define([
	"Nexus",
	"app/stories/TwitterLightHomepage/behavior/events/HomepageShown"
], function (Nexus, HomepageShown) {	
	
	var givenEvents = [
		HomepageShown.Event()
	];

	// given events, expect to generate route
	return new Nexus
	.GenerateRouteTest('Should generate Homepage shown route')
		.GivenEvents(givenEvents)
		.ExpectRoute('#TwitterLightHomepage/HomepageShown');			   
});
