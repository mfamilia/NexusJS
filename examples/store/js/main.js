require.config({
  paths: {
    "jquery": 'lib/jquery',
    "mustache": 'lib/mustache',
    "text": 'lib/text',
    "qunit": 'lib/qunit',
    "Nexus": 'lib/nexus'
  }
});

// Init
require(["Nexus"], function(Nexus) {
	Nexus.App.setUpBussesAndEventStore = function(){
		Nexus.App.CommandBus = Nexus.CreateLocalStorageCommandBus('LocalStorageCommandBus');
		Nexus.App.EventStore = Nexus.CreateLocalStorageCachableEventStore('CachableLocalStorageEventStore');
		Nexus.App.EventBus = Nexus.CreateLocalStorageEventBus(Nexus.App.EventStore, 'LocalStorageEventBus');		
	};

	Nexus.App.setUpIdGenerationStrategy = function(){
		Nexus.App.newId = Nexus.NewGuid;
	};

	Nexus.App.setUpReadModels = function(){
		Nexus.App.ReadModels.Sellers = Nexus.CreateLocalStorageReadModel("ServerDB.Sellers"); 
		Nexus.App.ReadModels.Buyers = Nexus.CreateLocalStorageReadModel("ServerDB.Buyers");
		Nexus.App.ReadModels.Logins = Nexus.CreateLocalStorageReadModel("ServerDB.Logins");
		Nexus.App.ReadModels.FailedLogins = Nexus.CreateLocalStorageReadModel("ServerDB.FailedLogins");		
	};

	Nexus.App.setUpAnalytics = function(){
		Nexus.App.Analytics.EnabledForCommands = false;
		Nexus.App.Analytics.EnabledForEvents = false;
		Nexus.App.Analytics.PostToAnalyticsServer = function(msg){
			// Your custom function here (ex: jquery's $.ajax())
			console.log('POST TO MY ANALYTICS SERVER. MESSAGE: ');
			console.log(msg);
		};
	};	

	Nexus.App.setUpBussesAndEventStore();
	Nexus.App.setUpIdGenerationStrategy();
	Nexus.App.setUpReadModels();
	Nexus.App.setUpAnalytics();	
		
});

// register command handlers and event handlers
require([
	"Nexus",
	"app/commandHandlers/buyerCommandHandlers", 
	"app/eventHandlers/buyerEventHandlers"
], function(Nexus,buyerCommandHandlers,buyerEventHandlers) {

	Nexus.App.CommandBus.registerCommandHandlers(buyerCommandHandlers);	
	Nexus.App.EventBus.registerEventHandlers(buyerEventHandlers);
});


// Populate Buyers
require([
	"jquery",
	"Nexus",
	"app/commands/buyerCommands"
], function($, Nexus, BuyerCommands) {
	$('#populateBuyers').click(function(){
		var buyers = [
			{
				id: Nexus.App.newId(),
				firstName: 'Buyer',
				lastName: 'One',
				userId: 'bone',
				password: 'pwd'
			},
			{
				id: Nexus.App.newId(),
				firstName: 'Buyer',
				lastName: 'Two',
				userId: 'btwo',
				password: 'pwd'
			}					
		];
					
		Nexus.App.CommandBus.dispatch(
			new BuyerCommands.PopulateBuyersCommand(
				buyers
			)
		);
	});
});


