NexusJS.Tests.LocalStorageCachableEventStoreTests = function(){

	module("Local Storage Cachable Event Store Tests"); 
	
	test("should create local storage cachable event store", function() {
		// Arrange/Act
		NexusJS.App.EventStore = NexusJS.CreateLocalStorageCachableEventStore('TESTlocalStorageKey');

		// Assert
		ok(NexusJS.Interfaces.CheckIfImplements(NexusJS.App.EventStore, NexusJS.Interfaces.EventStore), 'must implement event store interface');
		ok(NexusJS.App.EventStore.events.count, 'should initialize event store');																		
	});	
	
};