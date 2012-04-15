require.config({
  paths: {
    'jquery': 'lib/jquery',
    'mustache': 'lib/mustache',
    'text': 'lib/text',
    'qunit': 'lib/qunit',
    'Nexus': 'lib/nexus'
  }
});

// Init App
require([
	'Nexus',
	'app/commands/displayHomePage',
	
	// command handlers
	'app/commandHandlers/displayHomePageHandler',
	'app/commandHandlers/sayHelloHandler',	
	'app/commandHandlers/sayItHandler',	
	
	// event handlers
	'app/eventHandlers/homePageDisplayedHandler',
	'app/eventHandlers/helloScreenDisplayedHandler',	
	'app/eventHandlers/saidItHandler',
	'app/eventHandlers/errorRaisedHandler',
	'app/eventHandlers/highlightedHandler'
	
], function(
	Nexus,
	DisplayHomePage,
	
	// command handlers
	displayHomePageHandler,
	sayHelloHandler,
	sayItHandler,
	
	// event handlers
	homePageDisplayedHandler,
	helloScreenDisplayedHandler,	
	saidItHandler,
	errorRaisedHandler,
	highlightedHandler
) {
	// set up what to do with analytics
	Nexus.App.Analytics.PostToAnalyticsServer = function(msg){
		// will just log to console for now
		console.log('POST TO MY ANALYTICS SERVER. MESSAGE: ');
		console.log(msg);
	};
	
	// Register command handlers
	Nexus.App.CommandBus.registerCommandHandlers([
		displayHomePageHandler,
		sayHelloHandler,
		sayItHandler
	]);		
	
	// Register event handlers
	Nexus.App.EventBus.registerEventHandlers([
		homePageDisplayedHandler,
		helloScreenDisplayedHandler,
		saidItHandler,
		errorRaisedHandler,
		highlightedHandler
	]);	
	
	// Display main screen
	Nexus.App.CommandBus.dispatch(
		DisplayHomePage.Command(Nexus.App.newId(), new Date())
	);	
});


