TwitterLight.Events.SaveTweet = {
  eventName:"Save tweet",
  Event:function (tweet) {
    return {
      tweet:tweet,
      eventName:this.eventName
    };
  }
};