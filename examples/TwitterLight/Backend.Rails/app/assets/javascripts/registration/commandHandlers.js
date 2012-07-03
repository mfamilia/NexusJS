define([
  'stories/TwitterLightHomepage/behavior/registration/commandHandlers',
  'stories/ViewTweets/behavior/registration/commandHandlers',
  'stories/PostATweet/behavior/registration/commandHandlers'
], function (TwitterLightHomepageCommandHandlers, ViewTweetsCommandHandlers, PostATweetCommandHandlers) {

  return {
    register:function () {
      TwitterLightHomepageCommandHandlers.register();
      ViewTweetsCommandHandlers.register();
      PostATweetCommandHandlers.register();
    }
  }
});


