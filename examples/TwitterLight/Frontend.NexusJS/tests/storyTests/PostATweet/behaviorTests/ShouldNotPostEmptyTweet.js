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
	    Tweet: '',
	    commandName: 'Post new tweet'
	};
	
	// then
	var expectedEvents = [
		{
			Message: 'Tweet is required',
			eventName: 'Error raised'
		}  
	];
	
	var beforeTest = function(){
		// setup
	}
	
	// Tear down
	var afterTest = function(){
		// tear down
	}	

	return new Nexus
	    .BehaviorTest('Should notpost an empty tweet')
	    	.BeforeTest(beforeTest)
	    		.Given(givenEvents)
	    		.When(PostNewTweet)
	    		.Then(expectedEvents)
	    	.AfterTest(afterTest);

});


