NexusJS.Tests.CreateCachableEventStoreTests = function(){

	module("Create Cachable Event Store Tests"); 
	
	var TEST = {
		getMockArrayList: function(){
			return NexusJS.CreateSimpleArrayList(); //TODO: write test for it
		},
		mockEventBusPublishingMessage: "publishing",
		MockEventBus: function(){
			this.publish = function(){
				return TEST.mockEventBusPublishingMessage;	
			};
		},	
		getMockEventBus: function(){
			return new TEST.MockEventBus();
		},
		MockEvent: function(id, name, age){
			this.id = id;
			this.name = name;
			this.age = age;
		},
		mockEventId: '123',
		mockEventName: 'john',
		mockEventAge: 21,
		getMockEvent: function(){
			return new TEST.MockEvent(TEST.mockEventId, TEST.mockEventName, TEST.mockEventAge);
		},
		
		mockEventId2: '456',
		mockEventName2: 'kate',
		mockEventAge2: 20,
		getMockEvent2: function(){
			return new TEST.MockEvent(TEST.mockEventId2, TEST.mockEventName2, TEST.mockEventAge2);
		}		
		
	};
	
	test("should create cachable event store", function() {
		// Arrange/Act
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);

		// Assert
		ok(NexusJS.Interfaces.CheckIfImplements(NexusJS.App.EventStore, NexusJS.Interfaces.EventStore), 'should implement event store interface');
		ok(NexusJS.App.EventStore.events.count, 'should initialize event store');	
		deepEqual(NexusJS.App.EventStore.events, arrList, 'passed array list should equal initialized events');
		equal(NexusJS.App.EventStore.events.count(),0,'initialized event store should be empty')															
	});	
	
	test("should set event bus", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);
		
		var mockEventBus = TEST.getMockEventBus();
				
		// Act
		NexusJS.App.EventStore.setEventBus(mockEventBus);
		
		// Assert
		deepEqual(NexusJS.App.EventStore.eventBus, mockEventBus, 'right event bus should be set');
		equal(NexusJS.App.EventStore.eventBus.publish(),TEST.mockEventBusPublishingMessage,'methods on event bus set should be working correctly')
	});	
	
	test("should save event when not rehydrating aggregate and not replaying events", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);
		
		var mockEvent = TEST.getMockEvent();
				
		// Act
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(mockEvent);		
		
		// Assert
		equal(NexusJS.App.EventStore.events.count(), 1, 'event store should have 1 event');
		deepEqual(NexusJS.App.EventStore.events.getAt(0), mockEvent, 'event should be saved');
	});		
	
	test("should clear event store", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);
		
		var mockEvent = TEST.getMockEvent();
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(mockEvent);
						
		// Act
		NexusJS.App.EventStore.clear();		
		
		// Assert
		equal(NexusJS.App.EventStore.events.count(), 0, 'event store should be cleared');
	});		
	
	test("should not save event when rehydrating aggregate", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);
		
		var mockEvent = TEST.getMockEvent();
				
		// Act
		NexusJS.Aggregate.isRehydrating = true;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(mockEvent);		
		
		// Assert
		equal(NexusJS.App.EventStore.events.count(), 0, 'event store should have 0 events');
	});		
	
	test("should not save event when replaying events", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);
		
		var mockEvent = TEST.getMockEvent();
				
		// Act
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = true;
		NexusJS.App.EventStore.saveEvent(mockEvent);		
		
		// Assert
		equal(NexusJS.App.EventStore.events.count(), 0, 'event store should have 0 events');
	});	
	
	test("should get all events", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);
		
		var mockEvent = TEST.getMockEvent();
		var mockEvent2 = TEST.getMockEvent2();	
		
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(mockEvent);		
		NexusJS.App.EventStore.saveEvent(mockEvent2);			
				
		// Act
		var allEvents = NexusJS.App.EventStore.getAllEvents();
			
		// Assert
		ok(allEvents.map, 'events collection must have map function');
		equal(allEvents.size(), 2, 'event store should have 2 events');
		deepEqual(NexusJS.App.EventStore.events.getAt(0), mockEvent, 'should return correct events');		
	});		
	
	
	test("should replay all events", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);
		
		var mockEvent = TEST.getMockEvent();
		var mockEvent2 = TEST.getMockEvent2();	
		
		var expected = TEST.mockEventId + TEST.mockEventId2;
		var actual = '';
		
		var StubEventBus = function(){
			this.publish = function(evt){
				actual += evt.id;
			};
		}
		
		var eventBus = new StubEventBus();
		
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.setEventBus(eventBus);
		NexusJS.App.EventStore.saveEvent(mockEvent);		
		NexusJS.App.EventStore.saveEvent(mockEvent2);			
				
		// Act
		NexusJS.App.EventStore.replayAllEvents();
			
		// Assert
		equal(actual, expected, 'should publish all events when replaying all events');
		equal(NexusJS.Aggregate.isRehydrating, false, 'should turn off isRehydrating after replaying events');	
	});		
	
	
	test("should get all events by id", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);
		
		var mockEvent = TEST.getMockEvent();
		var mockEvent2 = TEST.getMockEvent2();	
		
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(mockEvent);		
		NexusJS.App.EventStore.saveEvent(mockEvent2);			
				
		// Act
		var allEventsById = NexusJS.App.EventStore.getAllEventsById(TEST.mockEventId);
			
		// Assert
		ok(allEventsById.map, 'events collection must have map function');
		equal(allEventsById.length, 1, 'event store should have 1 event');
		deepEqual(NexusJS.App.EventStore.events.getAt(0), mockEvent, 'should return correct events');		
	});		
		
	test("should rehydrate non namespaced aggregate", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);

		var CarCreatedEvent = function(id, name){
			this.id = id;
			this.name = name;
			this.eventName = "CarCreatedEvent";
		};
		
		var CarPaintedEvent = function(id, color){
			this.id = id;
			this.color = color;
			this.eventName = "CarPaintedEvent";
		};
		
		Car = function (id, name, color) {
			this.id = '';
			this.name = '';	
			this.color = '';
			
			this.applyEvent = function(evt){
				if (evt.eventName == 'CarCreatedEvent'){
					this.id = evt.id;
					this.name = evt.name;		
				}
				if (evt.eventName == 'CarPaintedEvent'){
					this.id = evt.id;
					this.color = evt.color;		
				}				
			};
		};		
		
		var carId = '123';
		var carName = 'BMW';
		var carColor = 'Yellow';
		var carCreatedEvent = new CarCreatedEvent(carId,carName);
		var carPaintedEvent = new CarPaintedEvent(carId,carColor);
		
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(carCreatedEvent);		
		NexusJS.App.EventStore.saveEvent(carPaintedEvent);		
		
		var expectedCar = new Car();
		expectedCar.applyEvent(carCreatedEvent);
		expectedCar.applyEvent(carPaintedEvent);		
				
		// Act
		var rehydratedCar = NexusJS.App.EventStore.rehydrate(carId,'Car');
			
		// Assert
		deepEqual(rehydratedCar, expectedCar, 'should rehydrate correctly');	
		deepEqual(NexusJS.App.EventStore.cache[0], rehydratedCar, 'should cache rehydrated object');					
	});		
	
	
	test("should rehydrate namespaced aggregate", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);

		var CarCreatedEvent = function(id, name){
			this.id = id;
			this.name = name;
			this.eventName = "CarCreatedEvent";
		};
		
		var CarPaintedEvent = function(id, color){
			this.id = id;
			this.color = color;
			this.eventName = "CarPaintedEvent";
		};
		
		Namespace = {};
		
		Namespace.Car = function (id, name, color) {
			this.id = '';
			this.name = '';	
			this.color = '';
			
			this.applyEvent = function(evt){
				if (evt.eventName == 'CarCreatedEvent'){
					this.id = evt.id;
					this.name = evt.name;		
				}
				if (evt.eventName == 'CarPaintedEvent'){
					this.id = evt.id;
					this.color = evt.color;		
				}				
			};
		};		
		
		var carId = '123';
		var carName = 'BMW';
		var carColor = 'Yellow';
		var carCreatedEvent = new CarCreatedEvent(carId,carName);
		var carPaintedEvent = new CarPaintedEvent(carId,carColor);
		
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(carCreatedEvent);		
		NexusJS.App.EventStore.saveEvent(carPaintedEvent);		
		
		var expectedCar = new Namespace.Car();
		expectedCar.applyEvent(carCreatedEvent);
		expectedCar.applyEvent(carPaintedEvent);		
				
		// Act
		var rehydratedCar = NexusJS.App.EventStore.rehydrate(carId,'Namespace.Car');
			
		// Assert
		deepEqual(rehydratedCar, expectedCar, 'should rehydrate correctly');
		deepEqual(NexusJS.App.EventStore.cache[0], rehydratedCar, 'should cache rehydrated object');		
	});		
	
//TODO: test so the object is rehydrated from cache when asked for more than once	
	
	
	
	
	
	
	test("should getById non namespaced aggregate", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);

		var CarCreatedEvent = function(id, name){
			this.id = id;
			this.name = name;
			this.eventName = "CarCreatedEvent";
		};
		
		var CarPaintedEvent = function(id, color){
			this.id = id;
			this.color = color;
			this.eventName = "CarPaintedEvent";
		};
		
		Car = function (id, name, color) {
			this.id = '';
			this.name = '';	
			this.color = '';
			
			this.applyEvent = function(evt){
				if (evt.eventName == 'CarCreatedEvent'){
					this.id = evt.id;
					this.name = evt.name;		
				}
				if (evt.eventName == 'CarPaintedEvent'){
					this.id = evt.id;
					this.color = evt.color;		
				}				
			};
		};		
		
		var carId = '123';
		var carName = 'BMW';
		var carColor = 'Yellow';
		var carCreatedEvent = new CarCreatedEvent(carId,carName);
		var carPaintedEvent = new CarPaintedEvent(carId,carColor);
		
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(carCreatedEvent);		
		NexusJS.App.EventStore.saveEvent(carPaintedEvent);		
		
		var expectedCar = new Car();
		expectedCar.applyEvent(carCreatedEvent);
		expectedCar.applyEvent(carPaintedEvent);		
				
		// Act
		var rehydratedCar = NexusJS.App.EventStore.getById(carId,'Car');
			
		// Assert
		deepEqual(rehydratedCar, expectedCar, 'should rehydrate correctly');	
		deepEqual(NexusJS.App.EventStore.cache[0], rehydratedCar, 'should cache rehydrated object');					
	});		
	
	
	test("should getById namespaced aggregate", function(){
		// Arrange
		var arrList = TEST.getMockArrayList();
		NexusJS.App.EventStore = NexusJS.CreateCachableEventStore(arrList);

		var CarCreatedEvent = function(id, name){
			this.id = id;
			this.name = name;
			this.eventName = "CarCreatedEvent";
		};
		
		var CarPaintedEvent = function(id, color){
			this.id = id;
			this.color = color;
			this.eventName = "CarPaintedEvent";
		};
		
		Namespace = {};
		
		Namespace.Car = function (id, name, color) {
			this.id = '';
			this.name = '';	
			this.color = '';
			
			this.applyEvent = function(evt){
				if (evt.eventName == 'CarCreatedEvent'){
					this.id = evt.id;
					this.name = evt.name;		
				}
				if (evt.eventName == 'CarPaintedEvent'){
					this.id = evt.id;
					this.color = evt.color;		
				}				
			};
		};		
		
		var carId = '123';
		var carName = 'BMW';
		var carColor = 'Yellow';
		var carCreatedEvent = new CarCreatedEvent(carId,carName);
		var carPaintedEvent = new CarPaintedEvent(carId,carColor);
		
		NexusJS.Aggregate.isRehydrating = false;
		NexusJS.isReplayingEvents = false;
		NexusJS.App.EventStore.saveEvent(carCreatedEvent);		
		NexusJS.App.EventStore.saveEvent(carPaintedEvent);		
		
		var expectedCar = new Namespace.Car();
		expectedCar.applyEvent(carCreatedEvent);
		expectedCar.applyEvent(carPaintedEvent);		
				
		// Act
		var rehydratedCar = NexusJS.App.EventStore.getById(carId,'Namespace.Car');
			
		// Assert
		deepEqual(rehydratedCar, expectedCar, 'should rehydrate correctly');
		deepEqual(NexusJS.App.EventStore.cache[0], rehydratedCar, 'should cache rehydrated object');		
	});		
	
	
	
	
	
	
	
};