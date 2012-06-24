define([
    'Nexus',
], function (Nexus) {

	// given
	var givenEvents = [];

	// when
	var NavigateToHomepage = {
	    commandName: 'Navigate to homepage'
	};
	
	// then
	var expectedEvents = [{
	        eventName: 'Homepage shown'
	}];
	
	return new Nexus
	    .BehaviorTest('Should navigate to homepage')
		.Given(givenEvents)
		.When(NavigateToHomepage)
		.Then(expectedEvents);

});


