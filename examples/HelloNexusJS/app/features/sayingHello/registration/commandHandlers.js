define([
    "Nexus",
    'app/features/sayingHello/commandHandlers/sayHelloHandler'
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


