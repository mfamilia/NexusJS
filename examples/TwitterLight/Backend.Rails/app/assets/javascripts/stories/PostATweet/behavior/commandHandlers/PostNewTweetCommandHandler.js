$(function () {
  TwitterLight.CommandHandlers.PostNewTweet = new Nexus.CommandHandler(
    'Post new tweet command handler',
    TwitterLight.Commands.PostNewTweet.commandName,
    function (cmd) {
      new TwitterLight.Models.PostATweet()
        .PostNewTweet(
        cmd.Tweet
      );
    }
  );
});

