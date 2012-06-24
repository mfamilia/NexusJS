define([
    'jquery',
    'Nexus',
	"app/stories/ViewTweets/behavior/commands/ViewAllTweets",				
	"app/stories/PostATweet/behavior/commands/ShowPostATweetForm",				
    "app/stories/PostATweet/behavior/events/ThanksForYourTweetPageShown"
], function ($, Nexus, ViewAllTweets, ShowPostATweetForm, ThanksForYourTweetPageShown) {

    return new Nexus.EventHandler(
        'Thanks for your tweet page shown event handler',
        ThanksForYourTweetPageShown.eventName,
        function(evt){
			new Nexus.View({
			    template: 'app/stories/PostATweet/ui/templates/ThanksForYourTweet.html',
			    placeholder: '#content',

			data: {
			    message: evt.Message,
			    tweet: evt.Tweet
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
									
			})
			.render();			
        }
    );

});
