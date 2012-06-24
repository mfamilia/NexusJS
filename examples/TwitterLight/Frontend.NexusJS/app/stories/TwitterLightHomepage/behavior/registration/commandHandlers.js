define([
    "Nexus",
       'app/stories/TwitterLightHomepage/behavior/commandHandlers/NavigateToHomepageCommandHandler'
], function (
    Nexus,
    NavigateToHomepageCommandHandler
    ) {

    return {
        register: function(){
            Nexus.CommandBus.registerCommandHandlers([
			    NavigateToHomepageCommandHandler
            ]);
        }
    }
});


