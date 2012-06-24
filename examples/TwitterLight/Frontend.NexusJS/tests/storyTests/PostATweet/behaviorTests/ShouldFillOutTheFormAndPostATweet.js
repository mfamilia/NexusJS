define([
    "Nexus",
], function (Nexus) {

	// given
	var givenEvents = [
	    {
	        eventName: 'Homepage shown'
	    },    
	    {
	        eventName: 'Post a tweet form shown'
	    }    
	];

	// when
	var PostNewTweet = {
	    Tweet: 'some tweet',
	    commandName: 'Post new tweet'
	};
	
	// then
	var expectedEvents = [
		{
	    	Tweet: 'some tweet',
	        eventName: 'Save tweet'
	    },    
		{
	    	Message: 'Thanks for your tweet',
	    	Tweet: 'some tweet',
	        eventName: 'Thanks for your tweet page shown'
	    },
	    {
	    	Message: '',
	    	eventName: 'Error raised'
	    }
	];
	
	return new Nexus
	    .BehaviorTest('Should fill out the form and post a tweet')
		.Given(givenEvents)
		.When(PostNewTweet)
		.Then(expectedEvents);

});


