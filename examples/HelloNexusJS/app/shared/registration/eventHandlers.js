define([
    "Nexus",
    'app/shared/eventHandlers/errorRaisedHandler',
    'app/shared/eventHandlers/highlightedHandler'
], function (
    Nexus,
    errorRaisedHandler,
    highlightedHandler
    ) {

    return {
        register: function(){
            Nexus.EventBus.registerEventHandlers([
                errorRaisedHandler,
                highlightedHandler
            ]);
        }
    }


});


