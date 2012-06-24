define([
	'jquery',
	'Nexus',
	'app/stories/PostATweet/behavior/commands/PostNewTweet',
	'app/stories/PostATweet/behavior/events/PostATweetFormShown',
	'app/stories/PostATweet/behavior/eventHandlers/ShowPostATweetFormEventHandler'
], function (
	$, 
	Nexus, 
	PostNewTweet,
	PostATweetFormShown, 
	ShowPostATweetFormEventHandler
) {
	
	var givenEvent = PostATweetFormShown.Event();
	
	var expectedView = new Nexus.View({
	    	template: 'app/stories/PostATweet/ui/templates/PostATweetForm.html',
	    	placeholder: '#content',
		data: {},	    	
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
		
	return new Nexus
	.ViewTest('Should show post a tweet form view')
		.GivenEvent(givenEvent)	
		.WhenHandledBy(ShowPostATweetFormEventHandler)	
		.ThenExpectView(expectedView);
			   
});
