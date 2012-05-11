define([
    'app/shared/registration/eventHandlers',
    'app/features/displayingHomepage/registration/eventHandlers',
    'app/features/sayingHello/registration/eventHandlers',
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

