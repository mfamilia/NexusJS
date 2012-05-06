define([
    "Nexus",
    'app/features/sayingIt/commandHandlers/sayItHandler'
], function (
    Nexus,
    sayItHandler
    ) {

    return {
        register: function(){
            Nexus.CommandBus.registerCommandHandlers([
                sayItHandler
            ]);
        }
    }


});


