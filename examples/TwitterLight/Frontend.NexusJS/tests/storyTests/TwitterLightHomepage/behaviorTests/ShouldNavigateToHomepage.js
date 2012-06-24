define([
    "Nexus",
], function (Nexus) {

	// given
	var givenEvents = [
	    	];

	// when
	var NavigateToHomepage = {
	    commandName: 'Navigate to homepage'
	};
	
	// then
	var expectedEvents = [
		{
	        eventName: 'Homepage shown'
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
	    .BehaviorTest('Should navigate to homepage')
	    	.BeforeTest(beforeTest)
	    		.Given(givenEvents)
	    		.When(NavigateToHomepage)
	    		.Then(expectedEvents)
	    	.AfterTest(afterTest);

});


