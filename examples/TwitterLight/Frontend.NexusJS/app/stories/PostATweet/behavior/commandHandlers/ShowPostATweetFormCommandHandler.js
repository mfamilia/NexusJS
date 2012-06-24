define([
    "Nexus",
    "app/stories/PostATweet/behavior/commands/ShowPostATweetForm",
    "app/stories/PostATweet/businessLogic/domain/PostATweet"
], function (Nexus, ShowPostATweetForm, PostATweet) {

    return new Nexus.CommandHandler(
        'Show post a tweet form command handler',
        ShowPostATweetForm.commandName,
        function(cmd){
            new PostATweet()
            	.ShowPostATweetForm(
            	);
        }
    );

});

