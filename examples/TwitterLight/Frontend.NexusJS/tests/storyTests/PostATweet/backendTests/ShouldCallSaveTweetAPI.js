define([
	'jquery',
	'Nexus',
	'app/stories/PostATweet/behavior/events/SaveTweet',
	'app/stories/PostATweet/behavior/eventHandlers/CallSaveTweetAPIEventHandler'
], function (
	$, 
	Nexus, 
	SaveTweet, 
	CallSaveTweetAPIEventHandler
) {
	
	var givenEvent = 
		SaveTweet.Event(
   			'some tweet'
		);
		
	var expectedBackendCall = new Nexus.BackendCall({
		type: 'POST',
		url: 'http://api.nexusjs.com/TwitterLight/SaveTweet',
		data: {
		    Text: 'some tweet'
		}	
	});
		
	return new Nexus
	.BackendTest('Should call save tweet API')
		.GivenEvent(givenEvent)	
		.WhenHandledBy(CallSaveTweetAPIEventHandler)	
		.ThenExpectBackendCall(expectedBackendCall);
			   
});
