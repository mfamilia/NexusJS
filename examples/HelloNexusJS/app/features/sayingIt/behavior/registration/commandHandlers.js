define([
    "Nexus",
    'app/features/sayingIt/behavior/commandHandlers/sayItHandler'
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


