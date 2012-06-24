define([
	'jquery',
	"Nexus",
	"app/stories/ViewTweets/behavior/commands/ViewAllTweets",
	"app/stories/PostATweet/behavior/commands/ShowPostATweetForm",
	"app/stories/TwitterLightHomepage/behavior/events/HomepageShown",
	'app/stories/TwitterLightHomepage/behavior/eventHandlers/ShowHomepageViewEventHandler'
], function (
	$, 
	Nexus, 
	ViewAllTweets,
	ShowPostATweetForm,
	HomepageShown, 
	ShowHomepageViewEventHandler
) {
	
	var givenEvent = 
		HomepageShown.Event(
		);
	
	var expectedView = new Nexus.View({
	    	template: 'app/stories/TwitterLightHomepage/ui/templates/Homepage.html',
	    	placeholder: '#content',
			data: {
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
	.ViewTest('Should display view and post tweets on homepage view')
		.BeforeTest(beforeTest)
			.GivenEvent(givenEvent)	
			.WhenHandledBy(ShowHomepageViewEventHandler)	
			.ThenExpectView(expectedView)
		.AfterTest(afterTest);
			   
});
