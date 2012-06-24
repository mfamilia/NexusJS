define([
       'app/stories/TwitterLightHomepage/behavior/registration/commandHandlers',
    'app/stories/ViewTweets/behavior/registration/commandHandlers',
    'app/stories/PostATweet/behavior/registration/commandHandlers'
], function (
    TwitterLightHomepageCommandHandlers,
    ViewTweetsCommandHandlers,
    PostATweetCommandHandlers
    ) {

    return {
        register: function(){
		    TwitterLightHomepageCommandHandlers.register();
		    ViewTweetsCommandHandlers.register();
		    PostATweetCommandHandlers.register();
        }
    }


});


