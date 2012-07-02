define([
    "Nexus",
    'app/shared/behavior/eventHandlers/errorRaisedHandler',
    'app/shared/behavior/eventHandlers/highlightedHandler'
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


