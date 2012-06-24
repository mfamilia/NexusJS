define([
    'jquery',
    'Nexus',
    'app/stories/ViewTweets/behavior/commands/ViewAllTweets',				
    'app/stories/PostATweet/behavior/commands/ShowPostATweetForm',				
    'app/stories/TwitterLightHomepage/behavior/events/HomepageShown'
], function ($, Nexus, ViewAllTweets, ShowPostATweetForm, HomepageShown) {

    return new Nexus.EventHandler(
        'Homepage shown event handler',
        HomepageShown.eventName,
        function(evt){
		new Nexus.View({
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
		})
		.render();			
        }
    );
    
});
