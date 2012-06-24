define([
	'jquery',
	'Nexus',
	'app/stories/PostATweet/behavior/events/ErrorRaised',
	'app/stories/PostATweet/behavior/eventHandlers/ShowErrorRaisedEventHandler'
], function (
	$, 
	Nexus, 
	ErrorRaised,
	ShowErrorRaisedEventHandler
) {
	
	var givenEvent = ErrorRaised.Event("ERROR MESSAGE");
	
	var expectedView = new Nexus.View({
	    	template: 'app/stories/PostATweet/ui/templates/Error.html',
	    	placeholder: '#error',
		data: {
		    message: 'ERROR MESSAGE'
		},	    	
		onLoad: function(){}				 	    
	});	
	
	return new Nexus
	.ViewTest('Should show post tweet error view')
		.GivenEvent(givenEvent)	
		.WhenHandledBy(ShowErrorRaisedEventHandler)	
		.ThenExpectView(expectedView);
			   
});
