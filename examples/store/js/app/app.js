require([
	"Nexus"
], function(Nexus) {


	Nexus.App.setUpBussesAndEventStore = function(){
		Nexus.App.CommandBus = Nexus.CreateSimpleCommandBus(); // Nexus.CreateLocalStorageCommandBus('LocalStorageCommandBus');
		Nexus.App.EventStore = Nexus.CreateSimpleCachableEventStore(); // Nexus.CreateLocalStorageCachableEventStore('CachableLocalStorageEventStore');
		Nexus.App.EventBus = Nexus.CreateSimpleEventBus(Nexus.App.EventStore); //Nexus.CreateLocalStorageEventBus(Nexus.App.EventStore, 'LocalStorageEventBus');		
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


	Nexus.App.init = function(){
		Nexus.App.setUpBussesAndEventStore();
		Nexus.App.setUpIdGenerationStrategy();
		Nexus.App.setUpReadModels();
		Nexus.App.setUpAnalytics();	
		
	};
		
});