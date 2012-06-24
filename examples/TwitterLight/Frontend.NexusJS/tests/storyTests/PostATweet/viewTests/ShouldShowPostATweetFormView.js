define([
	'jquery',
	"Nexus",
	"app/stories/PostATweet/behavior/commands/PostNewTweet",
	"app/stories/PostATweet/behavior/events/PostATweetFormShown",
	'app/stories/PostATweet/behavior/eventHandlers/ShowPostATweetFormEventHandler'
], function (
	$, 
	Nexus, 
	PostNewTweet,
	PostATweetFormShown, 
	ShowPostATweetFormEventHandler
) {
	
	var givenEvent = 
		PostATweetFormShown.Event(
		);
	
	var expectedView = new Nexus.View({
	    	template: 'app/stories/PostATweet/ui/templates/PostATweetForm.html',
	    	placeholder: '#content',
			data: {
			},	    	
			onLoad: function(){
				$('#PostATweet').click(function(){

					Nexus.CommandBus.dispatch(
						PostNewTweet.Command(
								$('#tweet').val()					
						)
					);	

				});			
			}			
	 	    
	});	
	
	// Setup
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
	.ViewTest('Should show post a tweet form view')
		.BeforeTest(beforeTest)
			.GivenEvent(givenEvent)	
			.WhenHandledBy(ShowPostATweetFormEventHandler)	
			.ThenExpectView(expectedView)
		.AfterTest(afterTest);
			   
});
