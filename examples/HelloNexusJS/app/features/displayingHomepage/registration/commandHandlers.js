define([
    "Nexus",
    'app/features/displayingHomepage/behavior/commandHandlers/displayHomePageHandler'
], function (
    Nexus,
    displayHomePageHandler
    ) {

    return {
        register: function(){
            Nexus.CommandBus.registerCommandHandlers([
                displayHomePageHandler
            ]);
        }
    }


});


