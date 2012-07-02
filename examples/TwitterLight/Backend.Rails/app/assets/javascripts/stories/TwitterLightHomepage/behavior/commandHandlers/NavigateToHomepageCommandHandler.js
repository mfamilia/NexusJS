$(function () {
  TwitterLight.CommandHandlers.NavigateToHomepage = new Nexus.CommandHandler(
    'Navigate to homepage command handler',
    TwitterLight.Commands.NavigateToHomepage.commandName,
    function (cmd) {
      new TwitterLight.Models.Homepage().NavigateToHomepage();
    }
  );
});
