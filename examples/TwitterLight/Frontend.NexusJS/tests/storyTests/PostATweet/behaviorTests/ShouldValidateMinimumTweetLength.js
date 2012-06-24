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
	    Tweet: '12',
	    commandName: 'Post new tweet'
	};
	
	// then
	var expectedEvents = [
		{
			Message: 'Tweet must be between 3 and 140 characters long',
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
	    .BehaviorTest('Should validate minimum tweet length')
	    	.BeforeTest(beforeTest)
	    		.Given(givenEvents)
	    		.When(PostNewTweet)
	    		.Then(expectedEvents)
	    	.AfterTest(afterTest);

});


