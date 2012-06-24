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
    'app/registration/eventHandlers'
], function(
	Nexus,
    routes,
    commandHandlers,
    eventHandlers
) {
    commandHandlers.register();
    eventHandlers.register();
    routes.register();

    var redirectToRoute = window.location.hash;

	//TODO: below enter your initial route
	if (window.location.href.indexOf("tests.html") == -1){
		Nexus.Router.route('#TwitterLightHomepage/HomepageShown');
	}
    

    if (redirectToRoute){
        Nexus.Router.route(redirectToRoute);
    }

});


