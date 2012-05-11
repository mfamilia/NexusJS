define([
	"Nexus",
	"app/shared/behavior/events/errorRaised",
	"app/shared/behavior/events/highlighted"
], function (Nexus, ErrorRaised, Highlighted) {	
	
	var givenEvents = [
		ErrorRaised.Event('Wrong something'),
		Highlighted.Event('#someArea')
	];

	// given events, expect to generate route
	return new Nexus
	.GenerateRouteTest('Should generate error route')
		.GivenEvents(givenEvents)
		.ExpectRoute('#ERROR:[Wrong something]/highlighted/[#someArea]');
			   
});
