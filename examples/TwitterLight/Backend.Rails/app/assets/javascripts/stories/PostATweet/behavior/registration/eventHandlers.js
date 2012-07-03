define([
  'nexus',
  'stories/PostATweet/behavior/eventHandlers/CallSaveTweetAPIEventHandler',
  'stories/PostATweet/behavior/eventHandlers/ShowThankYouPageEventHandler',
  'stories/PostATweet/behavior/eventHandlers/ShowPostATweetFormEventHandler',
  'stories/PostATweet/behavior/eventHandlers/ShowErrorRaisedEventHandler'
], function (Nexus, CallSaveTweetAPIEventHandler, ShowThankYouPageEventHandler, ShowPostATweetFormEventHandler, ShowErrorRaisedEventHandler) {
  return {
    register:function () {
      Nexus.EventBus.registerEventHandlers([
        CallSaveTweetAPIEventHandler,
        ShowThankYouPageEventHandler,
        ShowPostATweetFormEventHandler,
        ShowErrorRaisedEventHandler
      ]);
    }
  }
});


