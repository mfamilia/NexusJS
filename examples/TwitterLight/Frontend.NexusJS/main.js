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

    Nexus.App = {
    	ApiUrl: 'http://api.nexusjs.com'
    };

    commandHandlers.register();
    eventHandlers.register();
    routes.register();

    var redirectToRoute = window.location.hash;
    
    if (window.location.href.indexOf("tests.html") == -1){
	// initial route
	Nexus.Router.route('#TwitterLightHomepage/HomepageShown');
    }
    
    if (redirectToRoute){
        Nexus.Router.route(redirectToRoute);
    }

});


