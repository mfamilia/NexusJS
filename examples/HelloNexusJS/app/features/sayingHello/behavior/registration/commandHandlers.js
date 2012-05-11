define([
    "Nexus",
    'app/features/sayingHello/behavior/commandHandlers/sayHelloHandler'
], function (
    Nexus,
    sayHelloHandler
    ) {

    return {
        register: function(){
            Nexus.CommandBus.registerCommandHandlers([
                sayHelloHandler
            ]);
        }
    }


});


