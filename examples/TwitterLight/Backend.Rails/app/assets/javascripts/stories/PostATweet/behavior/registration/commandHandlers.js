TwitterLight.PostATweet.registerCommandHandlers = function () {
  Nexus.CommandBus.registerCommandHandlers([
    TwitterLight.CommandHandlers.ShowPostATweetForm,
    TwitterLight.CommandHandlers.PostNewTweet
  ]);
};


