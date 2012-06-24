define([
    'Nexus',
    'app/stories/ViewTweets/behavior/events/TweetsShown'
], function (
	Nexus,
	TweetsShown
    ){
	return function(){    
		this.ViewAllTweets = function(){		
			Nexus.EventBus.publish(
				TweetsShown.Event() 
			);		
		};
	};
});

