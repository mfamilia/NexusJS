define([
    'Nexus',
], function (Nexus) {

	// given
	var givenEvents = [{
	        eventName: 'Homepage shown'
	}];

	// when
	var ShowPostATweetForm = {
	    commandName: 'Show post a tweet form'
	};
	
	// then
	var expectedEvents = [{
	        eventName: 'Post a tweet form shown'
	}];
	
	return new Nexus
	    .BehaviorTest('Should let user post a tweet')
		.Given(givenEvents)
		.When(ShowPostATweetForm)
		.Then(expectedEvents);
});


