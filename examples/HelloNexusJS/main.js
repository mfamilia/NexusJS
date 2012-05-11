require.config({
  paths: {
    'jquery': 'lib/jquery',
    'mustache': 'lib/mustache',
    'text': 'lib/text',
    'Nexus': 'lib/nexus',
    'NexusTF': 'lib/nexus.test.framework'
  }
});

// Init App
require([
	'Nexus',
    'app/registration/routes',
    'app/registration/commandHandlers',
    'app/registration/eventHandlers',
    'app/registration/analytics'
], function(
	Nexus,
    routes,
    commandHandlers,
    eventHandlers,
    analytics
) {
    commandHandlers.register();
    eventHandlers.register();
    routes.register();
    analytics.register();

    var redirectToRoute = window.location.hash;

    Nexus.Router.route('#home');
    if (redirectToRoute){
        Nexus.Router.route(redirectToRoute);
    }

});


