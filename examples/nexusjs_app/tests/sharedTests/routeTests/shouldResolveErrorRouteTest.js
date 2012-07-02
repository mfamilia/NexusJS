define([
	"Nexus",
	"app/shared/behavior/events/errorRaised",
	"app/shared/behavior/events/highlighted"
], function (Nexus, ErrorRaised, Highlighted) {	
	
	var expectedEvents = [
		ErrorRaised.Event('Wrong something'),
		Highlighted.Event('#someArea')
	];

	// given a route, expect events to be published
	return new Nexus
	.ResolveRouteTest('Should resolve error route')
		.GivenRoute('#ERROR:[Wrong something]/highlighted/[#someArea]')
		.ExpectEvents(expectedEvents);
			   
});
