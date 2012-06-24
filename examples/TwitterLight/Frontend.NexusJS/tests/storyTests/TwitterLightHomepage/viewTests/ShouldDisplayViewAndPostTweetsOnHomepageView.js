define([
	'jquery',
	'Nexus',
	'app/stories/ViewTweets/behavior/commands/ViewAllTweets',
	'app/stories/PostATweet/behavior/commands/ShowPostATweetForm',
	'app/stories/TwitterLightHomepage/behavior/events/HomepageShown',
	'app/stories/TwitterLightHomepage/behavior/eventHandlers/ShowHomepageViewEventHandler'
], function (
	$, 
	Nexus, 
	ViewAllTweets,
	ShowPostATweetForm,
	HomepageShown, 
	ShowHomepageViewEventHandler
) {
	
	var givenEvent = HomepageShown.Event();
	
	var expectedView = new Nexus.View({
	    	template: 'app/stories/TwitterLightHomepage/ui/templates/Homepage.html',
	    	placeholder: '#content',
		data: {},	    	
		onLoad: function(){
			$('#ViewTweets').click(function(){
				Nexus.CommandBus.dispatch(
					ViewAllTweets.Command()
				);	
			});			
			$('#PostTweets').click(function(){
				Nexus.CommandBus.dispatch(
					ShowPostATweetForm.Command()
				);	
			});			
		}				 	    
	});	
	
	return new Nexus
	.ViewTest('Should display view and post tweets on homepage view')
		.GivenEvent(givenEvent)	
		.WhenHandledBy(ShowHomepageViewEventHandler)	
		.ThenExpectView(expectedView);
			   
});
