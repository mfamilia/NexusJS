define([
	'jquery',
	"Nexus",
	"app/stories/ViewTweets/behavior/events/TweetsShown",
	'app/stories/ViewTweets/behavior/eventHandlers/ShowAllTweetsViewEventHandler',
	'app/stories/TwitterLightHomepage/behavior/commands/NavigateToHomepage',
	'app/stories/PostATweet/behavior/commands/ShowPostATweetForm'
], function (
	$, 
	Nexus, 
	TweetsShown, 
	ShowAllTweetsViewEventHandler,
	NavigateToHomepage,
	ShowPostATweetForm
) {
	
	var givenEvent = 
		TweetsShown.Event(
		);
	
	var expectedView = new Nexus.View({
	    	template: 'app/stories/ViewTweets/ui/templates/ViewTweets.html',
	    	placeholder: '#content',
			data: ['MY TWEET'],	    	
			onLoad: function(){
				$('#ShowHomepage').click(function(){

					Nexus.CommandBus.dispatch(
						NavigateToHomepage.Command()
					);	

				});			
				$('#PostTweets').click(function(){

					Nexus.CommandBus.dispatch(
						ShowPostATweetForm.Command()
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
		Nexus.Mock
			.BackendCall()
				.Type('GET')
				.Url('http://api.nexusjs.com/TwitterLight/GetAllTweets')
				.Execute('onSuccess', ['MY TWEET']) // to mock  onSuccess
			.Setup();
		
	}
	
	// Tear down
	var afterTest = function(){
		// tear down
	}	
	return new Nexus
	.ViewTest('Should display all tweets view')
		.BeforeTest(beforeTest)
			.GivenEvent(givenEvent)	
			.WhenHandledBy(ShowAllTweetsViewEventHandler)	
			.ThenExpectView(expectedView)
		.AfterTest(afterTest);
			   
});
