TwitterLight.Commands.PostNewTweet = {
  commandName: "Post new tweet",
  Command: function(tweet){
    return {
      tweet: tweet,
      commandName: this.commandName
    };
  }
}
