define(function () {

  var SaveTweet = {
    eventName:"Save tweet",

    Event:function (Tweet) {
      return {
        Tweet:Tweet,
        eventName:SaveTweet.eventName
      };
    }
  };

  return SaveTweet;

});
