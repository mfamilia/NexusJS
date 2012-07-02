TwitterLight.EventHandlers = {
  register: function(){
    TwitterLight.Homepage.registerEventHandlers();
    TwitterLight.ViewTweets.registerEventHandlers();
    TwitterLight.PostATweet.registerEventHandlers();
  }
};