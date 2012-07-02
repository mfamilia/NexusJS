TwitterLight.Events.ThanksForYourTweetPageShown = {
  eventName:"Thanks for your tweet page shown",
  Event:function (message, tweet) {
    return {
      message:message,
      tweet:tweet,
      eventName:this.eventName
    };
  }
};
