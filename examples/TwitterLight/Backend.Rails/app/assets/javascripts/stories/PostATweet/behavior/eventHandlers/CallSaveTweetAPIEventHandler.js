$(function () {
  TwitterLight.EventHandlers.CallSaveTweetAPI = new Nexus.EventHandler(
    'Save tweet event handler',
    TwitterLight.Events.SaveTweet.eventName,
    function (evt) {
      new Nexus.BackendCall({
        type:'POST',
        url:Nexus.App.ApiUrl + '/TwitterLight/SaveTweet',
        data:{
          Text:evt.Tweet
        }
      }).perform();
    }
  );
});
