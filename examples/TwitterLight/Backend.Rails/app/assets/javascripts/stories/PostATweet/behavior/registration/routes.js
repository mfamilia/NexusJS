define([
  'nexus',
  'stories/PostATweet/behavior/events/ThanksForYourTweetPageShown',
  'stories/PostATweet/behavior/events/PostATweetFormShown',
  'stories/PostATweet/behavior/events/SaveTweet'
], function (Nexus, ThanksForYourTweetPageShown, PostATweetFormShown, SaveTweet) {
  return {
    register:function () {
      Nexus.Router.registerRoute('#PostATweet/ThanksForYourTweetPageShown/{Tweet}/{Message}', [ThanksForYourTweetPageShown.Event()]);
      Nexus.Router.registerRoute('#PostATweet/PostATweetFormShown', [PostATweetFormShown.Event()]);

      Nexus.Router.ignoreRoute([SaveTweet.Event()]);
    }
  };

});
