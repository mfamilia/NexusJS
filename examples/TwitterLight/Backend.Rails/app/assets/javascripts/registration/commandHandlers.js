TwitterLight.CommandHandlers = {
  register: function(){
    TwitterLight.Homepage.registerCommandHandlers();
    TwitterLight.ViewTweets.registerCommandHandlers();
    TwitterLight.PostATweet.registerCommandHandlers();
  }
};


