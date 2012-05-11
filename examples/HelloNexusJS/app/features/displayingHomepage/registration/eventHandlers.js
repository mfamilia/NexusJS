define([
    "Nexus",
    'app/features/displayingHomepage/behavior/eventHandlers/homePageDisplayedHandler',
    'app/features/displayingHomepage/behavior/eventHandlers/homePageDisplayedBackEndHandler'
], function (
    Nexus,
    homePageDisplayedHandler,
    homePageDisplayedBackEndHandler
    ) {

    return {
        register: function(){
            Nexus.EventBus.registerEventHandlers([
                homePageDisplayedHandler,
                homePageDisplayedBackEndHandler
            ]);
        }
    }


});


