define([
	"Nexus",
	"app/shared/events/errorRaised",
	"app/shared/events/highlighted"
], function (Nexus, ErrorRaised, Highlighted) {	
	
	var expectedEvents = [
		ErrorRaised.Event('msg'),
		Highlighted.Event('selector')
	];

	return new Nexus
	.ResolveRouteTest('Should resolve error route',250)
		.GivenRoute('#ERROR:[msg]/highlighted/[selector]')
		.ExpectEvents(expectedEvents);
			   
});
