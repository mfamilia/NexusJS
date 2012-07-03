define(function () {

  var ThanksForYourTweetPageShown = {
    eventName:"Thanks for your tweet page shown",

    Event:function (Message, Tweet) {
      return {
        Message:Message,
        Tweet:Tweet,
        eventName:ThanksForYourTweetPageShown.eventName
      };
    }
  };

  return ThanksForYourTweetPageShown;

});
