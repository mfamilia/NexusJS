TwitterLight.Homepage.registerCommandHandlers = function () {
  Nexus.CommandBus.registerCommandHandlers([
    TwitterLight.CommandHandlers.NavigateToHomepage
  ]);
};

