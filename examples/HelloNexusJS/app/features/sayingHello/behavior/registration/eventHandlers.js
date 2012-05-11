define([
    "Nexus",
    'app/features/sayingHello/behavior/eventHandlers/helloScreenDisplayedHandler',
    'app/features/sayingHello/behavior/eventHandlers/helloSentToBackendEventHandler'
], function (
    Nexus,
    helloScreenDisplayedHandler,
    helloSentToBackendEventHandler
    ) {

    return {
        register: function(){
            Nexus.EventBus.registerEventHandlers([
                helloScreenDisplayedHandler,
                helloSentToBackendEventHandler
            ]);
        }
    }


});


