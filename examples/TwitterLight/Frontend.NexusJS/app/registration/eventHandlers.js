define([
    'app/stories/TwitterLightHomepage/behavior/registration/eventHandlers',
    'app/stories/ViewTweets/behavior/registration/eventHandlers',
    'app/stories/PostATweet/behavior/registration/eventHandlers'
], function (
    TwitterLightHomepageEventHandlers,
    ViewTweetsEventHandlers,
    PostATweetEventHandlers
    ) {

    return {
        register: function(){
		    TwitterLightHomepageEventHandlers.register();
		    ViewTweetsEventHandlers.register();
		    PostATweetEventHandlers.register();
        }
    }


});