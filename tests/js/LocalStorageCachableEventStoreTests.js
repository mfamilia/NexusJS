define(['Nexus'],function(Nexus){
	Nexus.Tests.LocalStorageCachableEventStoreTests = function(){
	
		module("Local Storage Cachable Event Store Tests"); 
		
		test("should create local storage cachable event store", function() {
			// Arrange/Act
			Nexus.App.EventStore = Nexus.CreateLocalStorageCachableEventStore('TESTlocalStorageKey');
	
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(Nexus.App.EventStore, Nexus.Interfaces.EventStore), 'must implement event store interface');
			ok(Nexus.App.EventStore.events.count, 'should initialize event store');																		
		});	
		
	};
return Nexus.Tests.LocalStorageCachableEventStoreTests;
});

