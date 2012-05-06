define([
    "Nexus",
    'app/features/displayingHomepage/commandHandlers/displayHomePageHandler'
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


