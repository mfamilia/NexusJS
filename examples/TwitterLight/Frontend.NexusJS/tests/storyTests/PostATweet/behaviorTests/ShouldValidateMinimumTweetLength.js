define([
    "Nexus",
], function (Nexus) {

	// given
	var givenEvents = [
	    { eventName: 'Homepage shown' },    
	    { eventName: 'Post a tweet form shown' }    
	];

	// when
	var PostNewTweet = {
		Tweet: '12',
		commandName: 'Post new tweet'
	};
	
	// then
	var expectedEvents = [{
		Message: 'Tweet must be between 3 and 140 characters long',
		eventName: 'Error raised'
	}];
	
	return new Nexus
	    .BehaviorTest('Should validate minimum tweet length')
		.Given(givenEvents)
		.When(PostNewTweet)
		.Then(expectedEvents);

});


