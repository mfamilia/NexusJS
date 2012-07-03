define([
  'stories/TwitterLightHomepage/behavior/registration/eventHandlers',
  'stories/ViewTweets/behavior/registration/eventHandlers',
  'stories/PostATweet/behavior/registration/eventHandlers'
], function (TwitterLightHomepageEventHandlers, ViewTweetsEventHandlers, PostATweetEventHandlers) {

  return {
    register:function () {
      TwitterLightHomepageEventHandlers.register();
      ViewTweetsEventHandlers.register();
      PostATweetEventHandlers.register();
    }
  }


});