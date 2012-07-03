define([
  'nexus',
  'stories/ViewTweets/behavior/eventHandlers/ShowAllTweetsViewEventHandler'
], function (Nexus, ShowAllTweetsViewEventHandler) {
  return {
    register:function () {
      Nexus.EventBus.registerEventHandlers([
        ShowAllTweetsViewEventHandler
      ]);
    }
  }
});


