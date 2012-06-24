define([
    "Nexus",
       'app/stories/ViewTweets/behavior/events/TweetsShown'
], function (
    Nexus,
    TweetsShown
    ) {
    return function(){
    
		this.ViewAllTweets = function(
		){
		
			Nexus.EventBus.publish(
				TweetsShown.Event() 
			);
		
		/*
			new Nexus.BackendCall({
				type: 'GET',
				url: 'http://api.nexusjs.com/TwitterLight/GetAllTweets',
				onSuccess: function(data){
console.log(data);				
					Nexus.EventBus.publish(
						TweetsShown.Event(data) 
					);
				},
				onError: function(){
					console.log('there was an error calling view tweets backend');
				}
			})
			.perform();
		*/
        };
    
    };
});

