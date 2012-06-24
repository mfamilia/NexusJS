define([
    "Nexus",
], function (Nexus) {

	// given
	var givenEvents = [
		{ eventName: 'Homepage shown' },    
		{
	    		Tweet: 'MY TWEET',
	        	eventName: 'Save tweet'
	    	}    
	];

	// when
	var ViewAllTweets = {
	    commandName: 'View all tweets'
	};
	
	// then
	var expectedEvents = [{	
	        eventName: 'Tweets shown'
	}];
	
	return new Nexus
	    .BehaviorTest('Should view tweets')
		.Given(givenEvents)
		.When(ViewAllTweets)
		.Then(expectedEvents);

});


