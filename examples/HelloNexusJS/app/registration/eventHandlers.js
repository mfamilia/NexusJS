define([
    'app/shared/behavior/registration/eventHandlers',
    'app/features/displayingHomepage/behavior/registration/eventHandlers',
    'app/features/sayingHello/behavior/registration/eventHandlers',
    'app/features/sayingIt/registration/eventHandlers'
], function (
    sharedEventHandlers,
    displayingHomepageEventHandlers,
    sayingHelloEventHandlers,
    sayingItEventHandlers
    ) {

    return {
        register: function(){
            sharedEventHandlers.register();
            displayingHomepageEventHandlers.register();
            sayingHelloEventHandlers.register();
            sayingItEventHandlers.register();
        }
    }
});


