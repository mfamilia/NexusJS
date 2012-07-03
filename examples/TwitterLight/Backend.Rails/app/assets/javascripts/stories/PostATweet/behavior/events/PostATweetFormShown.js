define(function () {

  var PostATweetFormShown = {
    eventName:"Post a tweet form shown",

    Event:function () {
      return {
        eventName:PostATweetFormShown.eventName
      };
    }
  };

  return PostATweetFormShown;

});
