define([
  'stories/TwitterLightHomepage/behavior/registration/routes',
  'stories/ViewTweets/behavior/registration/routes',
  'stories/PostATweet/behavior/registration/routes'
], function (TwitterLightHomepageRoutes, ViewTweetsRoutes, PostATweetRoutes) {

  return {
    register:function () {
      TwitterLightHomepageRoutes.register();
      ViewTweetsRoutes.register();
      PostATweetRoutes.register();
    }
  }
});

