define([
    "Nexus",
    "app/stories/TwitterLightHomepage/behavior/commands/NavigateToHomepage",
    "app/stories/TwitterLightHomepage/businessLogic/domain/TwitterLightHomepage"
], function (Nexus, NavigateToHomepage, TwitterLightHomepage) {

    return new Nexus.CommandHandler(
        'Navigate to homepage command handler',
        NavigateToHomepage.commandName,
        function(cmd){
            new TwitterLightHomepage()
            	.NavigateToHomepage(
            	);
        }
    );

});

