define([
    "Nexus",
    'app/features/sayingIt/behavior/eventHandlers/saidItHandler'
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


