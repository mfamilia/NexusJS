TwitterLight.ViewTweets.registerEventHandlers = function () {
  Nexus.EventBus.registerEventHandlers([
    TwitterLight.EventHandlers.ShowAllTweetsView
  ]);
};

