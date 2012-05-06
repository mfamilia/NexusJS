define([
    "Nexus",
    'app/features/sayingHello/eventHandlers/helloScreenDisplayedHandler',
    'app/features/sayingHello/eventHandlers/helloSentToBackendEventHandler'
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


