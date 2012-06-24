define([
    'jquery',
    'Nexus',
    'app/stories/PostATweet/behavior/events/SaveTweet'
], function ($, Nexus, SaveTweet) {

    return new Nexus.EventHandler(
        'Save tweet event handler',
        SaveTweet.eventName,
        function(evt){
        
			new Nexus.BackendCall({
				type: 'POST',
				url: Nexus.App.ApiUrl + '/TwitterLight/SaveTweet',
				data: { 
				    Text: evt.Tweet
				}
			})
			.perform();        
			
        }
    );

});
