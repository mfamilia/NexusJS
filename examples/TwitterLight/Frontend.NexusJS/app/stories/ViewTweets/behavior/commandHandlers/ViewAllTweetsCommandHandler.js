define([
    "Nexus",
    "app/stories/ViewTweets/behavior/commands/ViewAllTweets",
    "app/stories/ViewTweets/businessLogic/domain/ViewTweets"
], function (Nexus, ViewAllTweets, ViewTweets) {

    return new Nexus.CommandHandler(
        'View all tweets command handler',
        ViewAllTweets.commandName,
        function(cmd){
            new ViewTweets()
            	.ViewAllTweets(
            	);
        }
    );

});

