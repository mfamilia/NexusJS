define([
    'app/stories/TwitterLightHomepage/behavior/registration/routes',
    'app/stories/ViewTweets/behavior/registration/routes',
    'app/stories/PostATweet/behavior/registration/routes'
], function (
    TwitterLightHomepageRoutes,
    ViewTweetsRoutes,
    PostATweetRoutes
    ) {

    return {
        register: function(){
		    TwitterLightHomepageRoutes.register();
		    ViewTweetsRoutes.register();
		    PostATweetRoutes.register();
        }
    }
});

