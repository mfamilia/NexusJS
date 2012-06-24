define([
    "Nexus",
       'app/stories/ViewTweets/behavior/commandHandlers/ViewAllTweetsCommandHandler'
], function (
    Nexus,
    ViewAllTweetsCommandHandler
    ) {

    return {
        register: function(){
            Nexus.CommandBus.registerCommandHandlers([
			    ViewAllTweetsCommandHandler
            ]);
        }
    }
});


