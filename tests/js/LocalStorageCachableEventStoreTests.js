define(['Nexus'],function(Nexus){
	Nexus.Tests.LocalStorageCachableEventStoreTests = function(){
	
		module("Local Storage Cachable Event Store Tests"); 
		
		test("should create local storage cachable event store", function() {
			// Arrange/Act
			Nexus.EventStore = Nexus.CreateLocalStorageCachableEventStore('TESTlocalStorageKey');
	
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(Nexus.EventStore, Nexus.Interfaces.EventStore), 'must implement event store interface');
			ok(Nexus.EventStore.events.count, 'should initialize event store');																		
		});	
		
	};
return Nexus.Tests.LocalStorageCachableEventStoreTests;
});

