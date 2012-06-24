define([
	"Nexus",
	"app/stories/TwitterLightHomepage/behavior/events/HomepageShown"
], function (Nexus, HomepageShown) {	
		
	var expectedEvents = [
		HomepageShown.Event()
	];

	// given a route, expect events to be published
	return new Nexus
	.ResolveRouteTest('Should resolve Homepage shown route')
		.GivenRoute('#TwitterLightHomepage/HomepageShown')
		.ExpectEvents(expectedEvents);
			   
});
