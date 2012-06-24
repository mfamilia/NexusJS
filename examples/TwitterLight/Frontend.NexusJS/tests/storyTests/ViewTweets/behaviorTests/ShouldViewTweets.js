define([
    "Nexus",
], function (Nexus) {

	// given
	var givenEvents = [
	    		{
	        eventName: 'Homepage shown'
	    },    
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

	var expectedEvents = [
		{
/*
	    	Tweets: 
	    	[
	    		'MY TWEET'
	    	],
*/	    	
	        eventName: 'Tweets shown'
	    }    
	];

	
	var beforeTest = function(){
		// Mock BackendCall
/*
		Nexus.Mock
			.BackendCall()
				.Type('GET')
				.Url('http://api.nexusjs.com/TwitterLight/GetAllTweets')
				.Execute('onSuccess', {Tweets: ['MY TWEET']}) // to mock  onSuccess
			.Setup();
*/			
	}
	
	// Tear down
	var afterTest = function(){
		// tear down
	}	

	return new Nexus
	    .BehaviorTest('Should view tweets')
	    	.BeforeTest(beforeTest)
	    		.Given(givenEvents)
	    		.When(ViewAllTweets)
	    		.Then(expectedEvents)
	    	.AfterTest(afterTest);

});


