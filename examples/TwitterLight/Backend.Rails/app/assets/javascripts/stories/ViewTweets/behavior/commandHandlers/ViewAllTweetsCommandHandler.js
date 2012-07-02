$(function () {
  TwitterLight.CommandHandlers.ViewAllTweets = new Nexus.CommandHandler(
    'View all tweets command handler',
    TwitterLight.Commands.ViewAllTweets.commandName,
    function (cmd) {
      new TwitterLight.Models.ViewTweets().ViewAllTweets();
    }
  );
});
