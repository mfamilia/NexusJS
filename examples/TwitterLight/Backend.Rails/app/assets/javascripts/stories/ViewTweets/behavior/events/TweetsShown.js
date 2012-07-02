TwitterLight.Events.TweetsShown = {
  eventName:"Tweets shown",
  Event:function (tweets) {
    return {
      tweets:tweets,
      eventName:this.eventName
    };
  }
};
