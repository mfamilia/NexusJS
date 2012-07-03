define([
  'nexus',
  'stories/PostATweet/behavior/commandHandlers/ShowPostATweetFormCommandHandler',
  'stories/PostATweet/behavior/commandHandlers/PostNewTweetCommandHandler'
], function (Nexus, ShowPostATweetFormCommandHandler, PostNewTweetCommandHandler) {

  return {
    register:function () {
      Nexus.CommandBus.registerCommandHandlers([
        ShowPostATweetFormCommandHandler,
        PostNewTweetCommandHandler
      ]);
    }
  }
});


