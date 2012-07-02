TwitterLight.ViewTweets.registerCommandHandlers = function () {
  Nexus.CommandBus.registerCommandHandlers([
    TwitterLight.CommandHandlers.ViewAllTweets
  ]);
};

