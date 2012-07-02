TwitterLight.ViewTweets.registerRoutes = function () {
  Nexus.Router.registerRoute('#ViewTweets/TweetsShown', [TwitterLight.Events.TweetsShown.Event()]);
};