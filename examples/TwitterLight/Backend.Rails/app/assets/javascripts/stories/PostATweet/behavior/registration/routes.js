TwitterLight.PostATweet.registerRoutes = function () {
  Nexus.Router.registerRoute('#PostATweet/ThanksForYourTweetPageShown/{Tweet}/{Message}', [TwitterLight.Events.ThanksForYourTweetPageShown.Event()]);
  Nexus.Router.registerRoute('#PostATweet/PostATweetFormShown', [TwitterLight.Events.PostATweetFormShown.Event()]);
  Nexus.Router.ignoreRoute([TwitterLight.Events.SaveTweet.Event()]);
};
