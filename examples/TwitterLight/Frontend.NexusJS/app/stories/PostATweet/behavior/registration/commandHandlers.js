define([
    "Nexus",
       'app/stories/PostATweet/behavior/commandHandlers/ShowPostATweetFormCommandHandler',
    'app/stories/PostATweet/behavior/commandHandlers/PostNewTweetCommandHandler'
], function (
    Nexus,
    ShowPostATweetFormCommandHandler,
    PostNewTweetCommandHandler
    ) {

    return {
        register: function(){
            Nexus.CommandBus.registerCommandHandlers([
			    ShowPostATweetFormCommandHandler,
			    PostNewTweetCommandHandler
            ]);
        }
    }
});


