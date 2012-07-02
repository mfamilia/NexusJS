$(function() {
  TwitterLight.CommandHandlers.ShowPostATweetForm = new Nexus.CommandHandler(
    'Show post a tweet form command handler',
    TwitterLight.Commands.ShowPostATweetForm.commandName,
    function(cmd){
      new TwitterLight.Models.PostATweet()
        .ShowPostATweetForm(
      );
    }
  );
});