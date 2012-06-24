define([
	'jquery',
	"Nexus",
	"app/stories/ViewTweets/behavior/commands/ViewAllTweets",
	"app/stories/PostATweet/behavior/commands/ShowPostATweetForm",
	"app/stories/PostATweet/behavior/events/ThanksForYourTweetPageShown",
	'app/stories/PostATweet/behavior/eventHandlers/ShowThankYouPageEventHandler'
], function (
	$, 
	Nexus, 
	ViewAllTweets,
	ShowPostATweetForm,
	ThanksForYourTweetPageShown, 
	ShowThankYouPageEventHandler
) {
	
	var givenEvent = 
		ThanksForYourTweetPageShown.Event(
   			'Thanks for your tweet',
   			'some tweet'
		);
	
	var expectedView = new Nexus.View({
	    	template: 'app/stories/PostATweet/ui/templates/ThanksForYourTweet.html',
	    	placeholder: '#content',
			data: {
			    message: 'Thanks for your tweet',
			    tweet: 'some tweet'
			},	    	
			onLoad: function(){
				$('#ViewTweets').click(function(){

					Nexus.CommandBus.dispatch(
						ViewAllTweets.Command(
						)
					);	

				});			
				$('#PostTweets').click(function(){

					Nexus.CommandBus.dispatch(
						ShowPostATweetForm.Command(
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
	.ViewTest('Should show thanks for your tweet view')
		.BeforeTest(beforeTest)
			.GivenEvent(givenEvent)	
			.WhenHandledBy(ShowThankYouPageEventHandler)	
			.ThenExpectView(expectedView)
		.AfterTest(afterTest);
			   
});
