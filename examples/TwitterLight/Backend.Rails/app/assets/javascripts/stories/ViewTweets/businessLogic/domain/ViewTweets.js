TwitterLight.Models.ViewAllTweets = function () {
  Nexus.EventBus.publish(
    TwitterLight.Events.TweetsShown.Event()
  );
};
