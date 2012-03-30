NexusJS.Tests.SimpleCachableEventStoreTests = function(){

	module("Simple Cachable Event Store Tests"); 
	
	test("should create simple cachable event store", function() {
		// Arrange/Act
		NexusJS.App.EventStore = NexusJS.CreateSimpleCachableEventStore();

		// Assert
		ok(NexusJS.Interfaces.CheckIfImplements(NexusJS.App.EventStore, NexusJS.Interfaces.EventStore), 'must implement event store interface');
		ok(NexusJS.App.EventStore.events.count, 'should initialize event store');																		
	});	
	
};