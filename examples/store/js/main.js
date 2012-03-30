require.config({
  paths: {
    "jquery": 'lib/jquery',
    "mustache": 'lib/mustache',
    "text": 'lib/text',
    "qunit": 'lib/qunit',
    
    "Nexus": 'lib/nexus',

    "Nexus.App.Commands.BuyerCommandNames": 'app/commands/buyerCommandNames',
    "Nexus.App.Commands.BuyerCommands": 'app/commands/buyerCommands',
    
    "Nexus.App.CommandHandlers.BuyerCommandHandlers": 'app/commandHandlers/buyerCommandHandlers',    
    
    "Nexus.App.Domain.Buyer": 'app/domain/buyer',
    
    "Nexus.App.Events.BuyerEventNames": 'app/events/buyerEventNames',
    "Nexus.App.Events.BuyerEvents": 'app/events/buyerEvents',
    
    "Nexus.App.EventHandlers.BuyerEventHandlers": 'app/eventHandlers/buyerEventHandlers',
    
    "Nexus.App.DTOs.BuyerDTOs": 'app/dtos/buyerDtos'
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

require([
	"Nexus.App.CommandHandlers.BuyerCommandHandlers", 
	"Nexus.App.EventHandlers.BuyerEventHandlers"
], function() {
	// register command handlers
	// register event handlers
});


// Populate Buyers
require([
	"jquery",
	"Nexus",
	"Nexus.App.Commands.BuyerCommands"
], function($, Nexus) {
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
			new Nexus.App.Commands.BuyerCommands.PopulateBuyersCommand(
				buyers
			)
		);
	});
});


