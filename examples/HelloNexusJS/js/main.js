require.config({
  paths: {
    'jquery': 'lib/jquery',
    'mustache': 'lib/mustache',
    'text': 'lib/text',
    'qunit': 'lib/qunit',
    'Nexus': 'lib/nexus'
  }
});

// Init Domain
require([
	'app/domain/mainScreen'
], function(){});

// Init App
require([
	'Nexus',
	'qunit',
	'app/commands/displayMainScreen',
	'app/commandHandlers/displayMainScreenHandler',
	'app/commandHandlers/sayHelloHandler',	
	'app/eventHandlers/mainScreenDisplayedHandler',
	'app/eventHandlers/helloScreenDisplayedHandler',
	'app/commandHandlers/sayItHandler',
	'app/eventHandlers/saidItHandler'
], function(
	Nexus,
	QUnit,
	DisplayMainScreen,
	displayMainScreenHandler,
	sayHelloHandler,
	mainScreenDisplayedHandler,
	helloScreenDisplayedHandler,
	sayItHandler,
	saidItHandler
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
		saidItHandler
	]);			
	
	// Display main screen
	Nexus.App.CommandBus.dispatch(
		new DisplayMainScreen.Command(Nexus.App.newId(), new Date())
	);	
});


