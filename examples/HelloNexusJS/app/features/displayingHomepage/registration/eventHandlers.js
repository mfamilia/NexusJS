define([
    "Nexus",
    'app/features/displayingHomepage/eventHandlers/homePageDisplayedHandler',
    'app/features/displayingHomepage/eventHandlers/homePageDisplayedBackEndHandler'
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


