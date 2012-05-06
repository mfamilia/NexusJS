define([
    "Nexus",
    'app/features/sayingIt/eventHandlers/saidItHandler'
], function (
    Nexus,
    saidItHandler
    ) {

    return {
        register: function(){
            Nexus.EventBus.registerEventHandlers([
                saidItHandler
            ]);
        }
    }


});


