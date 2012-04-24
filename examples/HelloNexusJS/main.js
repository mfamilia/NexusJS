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
	'app/features/displayingHomepage/commands/displayHomePage',
	
	// command handlers
	'app/features/displayingHomepage/commandHandlers/displayHomePageHandler',
	'app/features/sayingHello/commandHandlers/sayHelloHandler',	
	'app/features/sayingIt/commandHandlers/sayItHandler',	
	
	// event handlers
	'app/features/displayingHomepage/eventHandlers/homePageDisplayedHandler',
	'app/features/sayingHello/eventHandlers/helloScreenDisplayedHandler',	
	'app/features/sayingIt/eventHandlers/saidItHandler',
	'app/shared/eventHandlers/errorRaisedHandler',
	'app/shared/eventHandlers/highlightedHandler',
	'app/features/displayingHomepage/eventHandlers/homePageDisplayedBackEndHandler'
	
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
	highlightedHandler,
	homePageDisplayedBackEndHandler
) {
	// set up what to do with analytics
	Nexus.Analytics.PostToAnalyticsServer = function(msg){
		// will just log to console for now
		//console.log('POST TO MY ANALYTICS SERVER. MESSAGE: ');
		//console.log(msg);
	};
	
	// Register command handlers
	Nexus.CommandBus.registerCommandHandlers([
		displayHomePageHandler,
		sayHelloHandler,
		sayItHandler
	]);		
	
	// Register event handlers
	Nexus.EventBus.registerEventHandlers([
		homePageDisplayedHandler,
		helloScreenDisplayedHandler,
		saidItHandler,
		errorRaisedHandler,
		highlightedHandler,
		homePageDisplayedBackEndHandler
	]);	
	
	// Display main screen

	Nexus.CommandBus.dispatch(
		DisplayHomePage.Command(Nexus.newId(), new Date)
	);	

});


