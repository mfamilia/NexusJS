define([
    "Nexus",
    'app/stories/PostATweet/behavior/commands/PostNewTweet',
    'app/stories/PostATweet/businessLogic/domain/PostATweet'
], function (Nexus, PostNewTweet, PostATweet) {

    return new Nexus.CommandHandler(
        'Post new tweet command handler',
        PostNewTweet.commandName,
        function(cmd){        
            new PostATweet()
            	.PostNewTweet(
            		cmd.Tweet
            	);
        }
    );

});

