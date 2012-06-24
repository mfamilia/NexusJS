define([
    'Nexus',
    'app/stories/PostATweet/behavior/eventHandlers/CallSaveTweetAPIEventHandler',
    'app/stories/PostATweet/behavior/eventHandlers/ShowThankYouPageEventHandler',
    'app/stories/PostATweet/behavior/eventHandlers/ShowPostATweetFormEventHandler',
    'app/stories/PostATweet/behavior/eventHandlers/ShowErrorRaisedEventHandler'    
], function (
	Nexus,
	CallSaveTweetAPIEventHandler,
	ShowThankYouPageEventHandler,
	ShowPostATweetFormEventHandler,
	ShowErrorRaisedEventHandler
    ){
	return {
		register: function(){
			Nexus.EventBus.registerEventHandlers([
				    CallSaveTweetAPIEventHandler,
				    ShowThankYouPageEventHandler,
				    ShowPostATweetFormEventHandler,
				    ShowErrorRaisedEventHandler
			]);
		}
	}
});


