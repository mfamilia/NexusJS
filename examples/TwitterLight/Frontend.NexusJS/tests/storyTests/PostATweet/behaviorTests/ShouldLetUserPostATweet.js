define([
    "Nexus",
], function (Nexus) {

	// given
	var givenEvents = [
	    		{
	        eventName: 'Homepage shown'
	    }    
	];

	// when
	var ShowPostATweetForm = {
	    commandName: 'Show post a tweet form'
	};
	
	// then
	var expectedEvents = [
		{
	        eventName: 'Post a tweet form shown'
	    }    
	];
	
	var beforeTest = function(){
		// Mock BackendCall
		/*
		Nexus.Mock
			.BackendCall()
				.Type('GET')
				.Url('http://localhost/your/url')
				.Execute('onSuccess', {key: 'value'}) // to mock  onSuccess
				.Execute('onError', {key: 'value'}) // to mock onError
			.Setup();
		*/
	}
	
	// Tear down
	var afterTest = function(){
		// tear down
	}	

	return new Nexus
	    .BehaviorTest('Should let user post a tweet')
	    	.BeforeTest(beforeTest)
	    		.Given(givenEvents)
	    		.When(ShowPostATweetForm)
	    		.Then(expectedEvents)
	    	.AfterTest(afterTest);

});


