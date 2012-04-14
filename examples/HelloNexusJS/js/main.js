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
	'app/commands/displayMainScreen',
	
	// command handlers
	'app/commandHandlers/displayMainScreenHandler',
	'app/commandHandlers/sayHelloHandler',	
	'app/commandHandlers/sayItHandler',	
	
	// event handlers
	'app/eventHandlers/mainScreenDisplayedHandler',
	'app/eventHandlers/helloScreenDisplayedHandler',	
	'app/eventHandlers/saidItHandler',
	'app/eventHandlers/errorRaisedHandler',
	'app/eventHandlers/highlightedHandler'
	
], function(
	Nexus,
	DisplayMainScreen,
	
	// command handlers
	displayMainScreenHandler,
	sayHelloHandler,
	sayItHandler,
	
	// event handlers
	mainScreenDisplayedHandler,
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
		displayMainScreenHandler,
		sayHelloHandler,
		sayItHandler
	]);		
	
	// Register event handlers
	Nexus.App.EventBus.registerEventHandlers([
		mainScreenDisplayedHandler,
		helloScreenDisplayedHandler,
		saidItHandler,
		errorRaisedHandler,
		highlightedHandler
	]);	
	
	// Display main screen
	Nexus.App.CommandBus.dispatch(
		new DisplayMainScreen.Command(Nexus.App.newId(), new Date())
	);	
});


