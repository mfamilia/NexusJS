define([
    'app/features/displayingHomepage/registration/commandHandlers',
    'app/features/sayingHello/registration/commandHandlers',
    'app/features/sayingIt/registration/commandHandlers'
], function (
    displayingHomepageCommandHandlers,
    sayingHelloCommandHandlers,
    sayingItCommandHandlers
    ) {

    return {
        register: function(){
            displayingHomepageCommandHandlers.register();
            sayingHelloCommandHandlers.register();
            sayingItCommandHandlers.register();
        }
    }


});

