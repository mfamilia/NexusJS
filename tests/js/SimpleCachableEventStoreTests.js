define(['Nexus'],function(Nexus){
	Nexus.Tests.SimpleCachableEventStoreTests = function(){
	
		module("Simple Cachable Event Store Tests"); 
		
		test("should create simple cachable event store", function() {
			// Arrange/Act
			Nexus.App.EventStore = Nexus.CreateSimpleCachableEventStore();
	
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(Nexus.App.EventStore, Nexus.Interfaces.EventStore), 'must implement event store interface');
			ok(Nexus.App.EventStore.events.count, 'should initialize event store');																		
		});	
		
	};
return Nexus.Tests.SimpleCachableEventStoreTests;
});

