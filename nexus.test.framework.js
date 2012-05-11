///////////////////////////////////////////////////
///// Project: NexusJS - Test Framework ///////////
///// Source: github.com/aksharp/NexusJS //////////
///////////////////////////////////////////////////
///// Author: Alex Khotyanov //////////////////////
///// Twitter: @NexusJS ///////////////////////////
///// Email: Alex@NexusJS.com /////////////////////
///////////////////////////////////////////////////
///// License: LGPL v3 ////////////////////////////
///// * http://www.gnu.org/copyleft/lesser.html ///
///// * Please email me if you are using NexusJS //
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///// WORK IN PROGRESS ////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

require(['Nexus'],function(Nexus){

///////////////////////////////////////////////////    
// TEST NEXUS FRAMEWORK ///////////////////////////
///////////////////////////////////////////////////
Nexus.Tests = {
	run: function(tests){
		tests.map(function(test){
			test();
		});
	}
};

/////////////////////////////////////////////////////
///////// TEST RUNNER ///////////////////////////////
/////////////////////////////////////////////////////
Nexus.TestRunner = function(name){
	self = this;
	self.name = name;
	self.id = Nexus.NewGuid();
	self.run = function(modules){
		Nexus.TestHelper.appendToTestResults('<div class="nexus-test-runner">' + self.name + '</div><div id="' + self.id +'"></div>');
		for (var i=0; i<modules.length; i++){
			if (modules.length > (i+1)){
				modules[i]._nextModule = modules[i+1];
			}	
		}		
		modules[0].run(self.id);		
	};
};

/////////////////////////////////////////////////////
///////// TEST MODULE ///////////////////////////////
/////////////////////////////////////////////////////
Nexus.TestModule = function(name, tests){
	var self = this;
	self.waitTime = 0;
	tests.map(function(test){
		self.waitTime += test.waitTime;
	});
	self.name = name;
	self.tests = tests;
	self.id = Nexus.NewGuid();
	self._nextModule = {
		run: function(testRunnerId){
			Nexus.TestHelper.appendDoneToTestRunner(testRunnerId);		
		}
	};
	self._runTests = function(testRunnerId){
		Nexus.TestHelper.appendToTestRunner(testRunnerId, '<div class="nexus-test-module">' + self.name + '</div><div id="' + self.id +'"></div>');
		for (var i=0; i<self.tests.length; i++){
			if (self.tests.length > (i+1)){
				self.tests[i]._nextTest = self.tests[i+1];
			}	
		}		
		self.tests[0].Run(self.id);			
	};
	
	self.run = function(testRunnerId){
		self._runTests(testRunnerId);		
		setTimeout(function(){																																							
			self._nextModule.run(testRunnerId);		
		},self.waitTime);	
	};	
};

/////////////////////////////////////////////////////
///////// TEST HELPER ///////////////////////////////
/////////////////////////////////////////////////////
Nexus.TestHelper = {
	appendToTestResults: function(html){
		document.getElementById("nexus-test-results").innerHTML += html;
	},
	appendToModule: function(moduleId, html){
		document.getElementById(moduleId).innerHTML += html;
	},
	appendToTestRunner: function(testRunnerId, html){
		document.getElementById(testRunnerId).innerHTML += html;
	},	
	getExpectedActualErrorMessage: function(expected, actual, whatAreYouTesting){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Wrong ' + whatAreYouTesting + ' </div>'
		+ '<div class="nexus-test-failed-expected-header">EXPECTED: </div>'
		+ '<div class="nexus-test-failed-expected-events">' + expected + '</div>'
		+ '<div class="nexus-test-failed-actual-header">ACTUAL: </div>'
		+ '<div class="nexus-test-failed-actual-events">' + actual + '</div>'
		+ '</div>';	
	},
	getUnexpectedErrorMessage: function(actual, whatAreYouTesting){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Unexpected ' + whatAreYouTesting + '</div>'
		+ '<div class="nexus-test-failed-actual-events">ACTUAL: ' + actual + '</div>'
		+ '</div>';	
	},
	getNoActualErrorMessage: function(expected, whatAreYouTesting){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Actual ' + whatAreYouTesting + ' is missing</div>'
		+ '<div class="nexus-test-failed-actual-events">EXPECTED: ' + expected + '</div>'
		+ '</div>';	
	},	
	appendDoneToModule: function(moduleId){
		Nexus.TestHelper.appendToModule(moduleId, '<div class="nexus-test-module-separator"></div>');	
	},
	appendDoneToTestRunner: function(testRunnerId){
		Nexus.TestHelper.appendToTestRunner(testRunnerId, '<div>DONE!</div>');	
	},	
	renderAsserts: function(moduleId, testName, errors){
		var passFail = (errors == '') ? '<span class="nexus-test-passed">[PASSED] </span>' : '<span class="nexus-test-failed">[FAILED] </span>';				
		Nexus.TestHelper.appendToModule(moduleId, '<div>' 
		+ passFail
		+ '<span class="nexus-test-name">' + testName + '</span>'		
		+ errors
		+ '</div>');	
	},
	getUnregisteredEventHandlerMessage: function(eventHandlerName){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Unregistered event handler: ' + eventHandlerName + '</div>'
		+ '</div>';
	},
	getEventNotHandledBySpecifiedEventHandlerMessage: function(eventHandlerName, expectedEventToHandle, actualEventItHandles){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Event handler ' + eventHandlerName + ' does not handle this event</div>'
		+ '<div class="nexus-test-failed-expected-header">EXPECTED TO HANDLE: </div>'
		+ '<div class="nexus-test-failed-expected-events">' + expectedEventToHandle + '</div>'
		+ '<div class="nexus-test-failed-actual-header">ACTUALLY HANDLES: </div>'
		+ '<div class="nexus-test-failed-actual-events">' + actualEventItHandles + '</div>'
		+ '</div>';	
	},
	assert: function(expected, actual, whatAreYouTesting){
		var errors = '';
		if (expected && !actual){
			errors += Nexus.TestHelper.getNoActualErrorMessage(expected, whatAreYouTesting);
		}else if(!expected && actual){
			errors += Nexus.TestHelper.getUnexpectedErrorMessage(actual, whatAreYouTesting);						
		}else if (expected && actual && expected != actual){
			errors += Nexus.TestHelper.getExpectedActualErrorMessage(expected, actual, whatAreYouTesting);												
		}	
		return errors;
	}	
};

/////////////////////////////////////////////////////
///////// BEHAVIOR TEST /////////////////////////////
/////////////////////////////////////////////////////
Nexus.BehaviorTest = function(name, waitTime){

	var fixture = this;
	fixture.name = name;
	fixture.waitTime = waitTime || 0;
	fixture.errors = '';
		
	fixture.BeforeTest = function(beforeTest){
		fixture.beforeTest = beforeTest;	
		return fixture;
	};
	
	fixture.AfterTest = function(afterTest){
		fixture.afterTest = afterTest;	
		return fixture;
	};
	
	fixture.Given = function(givenEvents){
		fixture.givenEvents = givenEvents;
		return fixture;
	};
	
	fixture.When = function(whenCommand){
		fixture.whenCommand = whenCommand;
		return fixture;
	};
	
	fixture.Then = function(thenEvents){
		fixture.expectedEvents = thenEvents;	
		return fixture;
	};
	
	fixture._beforeTest = function(){
		// setup 
		Nexus.isInTestMode = true;
		Nexus.Aggregate.isRehydrating = false;
		Nexus._finalGivenEvent = 'final_given_event';	

		// test uses fake event store so not to write to real one
		fixture.BACKUP = {
			EVENT_STORE: Nexus.EventStore,
			ANALYTICS_ENABLED_FOR_COMMANDS: Nexus.Analytics.EnabledForCommands,
			ANALYTICS_ENABLED_FOR_EVENTS: Nexus.Analytics.EnabledForEvents,
			JSON_GET: Nexus.jsonGET,
			JSON_POST: Nexus.jsonPOST,
			JSON_PUT: Nexus.jsonPUT,
			JSON_DELETE: Nexus.jsonDELETE
		};		
						
		// backup app state			
		Nexus.EventStore = Nexus.CreateSimpleEventStore();
		Nexus.EventBus.eventStore = Nexus.EventStore;
		Nexus.EventStore.setEventBus(Nexus.EventBus);								
		Nexus.Analytics.EnabledForCommands = false;
		Nexus.Analytics.EnabledForEvents = false;
		Nexus.jsonGET = function(){/*do nothing*/};
		Nexus.jsonPOST = function(){/*do nothing*/};
		Nexus.jsonPUT = function(){/*do nothing*/};
		Nexus.jsonDELETE = function(){/*do nothing*/};
		if (Nexus.Util.isFunction(fixture.beforeTest)){
			fixture.beforeTest();
		}	
	};
	
	fixture._afterTest = function(){
		if (Nexus.Util.isFunction(fixture.afterTest)){
			fixture.afterTest();
		}	
		// restore app state
		Nexus.EventStore = fixture.BACKUP.EVENT_STORE;
		Nexus.EventBus.eventStore = Nexus.EventStore;
		Nexus.EventStore.setEventBus(Nexus.EventBus);	
		Nexus.Analytics.EnabledForCommands = fixture.BACKUP.ANALYTICS_ENABLED_FOR_COMMANDS;
		Nexus.Analytics.EnabledForEvents = fixture.BACKUP.ANALYTICS_ENABLED_FOR_EVENTS;																
		Nexus.jsonGET = fixture.BACKUP.JSON_GET;
		Nexus.jsonPOST = fixture.BACKUP.JSON_POST;
		Nexus.jsonPUT = fixture.BACKUP.JSON_PUT;
		Nexus.jsonDELETE = fixture.BACKUP.JSON_DELETE;
		Nexus.isInTestMode = false;			
	};
	
	fixture._publishGivenEvents = function(){
		if (fixture.givenEvents){
			Nexus.Util.handleOneOrMany(
				fixture.givenEvents, 
				function(evt){
					Nexus.EventBus.publish(evt);
				}
			);									
		}
		Nexus.EventStore.saveEvent(Nexus._finalGivenEvent);	
	};
	
	fixture._dispatchWhenCommand = function(){
		Nexus.CommandBus.dispatch(fixture.whenCommand); // single command only! by design!	
	};
	
	fixture._getExpectedEvents = function(){
		return Nexus.Util.handleOneOrMany(
			fixture.expectedEvents, 
			function(evt){								
				return JSON.stringify(evt);
			}, 
			function(arr){
				return arr.join('');
			}
		);	
	};
	
	fixture._getActualEvents = function(){
		var actualEvents = '';
		var startWritingToActualEvents = false;

		Nexus.EventStore.getAllEvents().map(function (evt) {
			if (startWritingToActualEvents){
				actualEvents += JSON.stringify(evt);
			}
			if (evt == Nexus._finalGivenEvent){
				startWritingToActualEvents = true;
			}
		});	
		return actualEvents;	
	};
	
	fixture._asserts = function(moduleId){
		var expectedEvents = fixture._getExpectedEvents();
		var actualEvents = fixture._getActualEvents();
		
		// behavior asserts
		if (actualEvents != expectedEvents){	
			fixture.errors = Nexus.TestHelper.getExpectedActualErrorMessage(expectedEvents, actualEvents || 'No events were published', 'events. Actual events do not match expected events!');				
		}	
		
		// render asserts
		Nexus.TestHelper.renderAsserts(moduleId, fixture.name, fixture.errors);			
	};
		
	fixture._nextTest = {
		Run: function(moduleId){
			Nexus.TestHelper.appendDoneToModule(moduleId);		
		}
	};
	
	fixture.Run = function(moduleId){
		fixture._beforeTest();
		fixture._publishGivenEvents();
		fixture._dispatchWhenCommand();		
		setTimeout(function(){																					
			fixture._asserts(moduleId);
			fixture._afterTest();	
			fixture._nextTest.Run(moduleId);
		},fixture.waitTime); // waitTime for async tests			


	};	
};

/////////////////////////////////////////////////////
///////// VIEW TEST /////////////////////////////////
/////////////////////////////////////////////////////
Nexus.ViewTest = function(name, waitTime){
	var fixture = this;
	fixture.waitTime = waitTime || 0;		
	fixture.name = name;
	fixture.errors = '';
	
	fixture._beforeTest = function(){
		// setup 
		Nexus.isInTestMode = true;

		// test uses fake event store so not to write to real one
		fixture.BACKUP = {
			NEXUS_VIEW: Nexus.View,
			JSON_GET: Nexus.jsonGET,
			JSON_POST: Nexus.jsonPOST,
			JSON_PUT: Nexus.jsonPUT,
			JSON_DELETE: Nexus.jsonDELETE
		};		
		
		Nexus.jsonGET = function(){/*do nothing*/};
		Nexus.jsonPOST = function(){/*do nothing*/};
		Nexus.jsonPUT = function(){/*do nothing*/};
		Nexus.jsonDELETE = function(){/*do nothing*/};
		
		// nexus view stub
		Nexus.View = function(view){
			var self = this; 
			self.data = view.data;
			self.onLoad = view.onLoad;		
			self.template = view.template;
			self.placeholder = view.placeholder;
			self.childViews = view.childViews;
			self.render = function(){
				if (self.template){
					fixture.setActualTemplate(self.template);
				}
				if (self.placeholder){
					fixture.setActualPlaceholder(self.placeholder);
				}
				if (self.data){
					fixture.setActualData(self.data);
				}
				if (self.onLoad){
					fixture.setActualOnLoad(self.onLoad);				
				}
			};	
			return self;
		};
	};
	
	fixture._afterTest = function(){
		// restore app state
		Nexus.View = fixture.BACKUP.NEXUS_VIEW;	
		Nexus.jsonGET = fixture.BACKUP.JSON_GET;
		Nexus.jsonPOST = fixture.BACKUP.JSON_POST;
		Nexus.jsonPUT = fixture.BACKUP.JSON_PUT;
		Nexus.jsonDELETE = fixture.BACKUP.JSON_DELETE;
		Nexus.isInTestMode = false;			
	};	
	
	fixture.ExpectTemplate = function(template){
		fixture.expectedTemplate = template;
		return fixture;
	};	

	fixture.ExpectPlaceholder = function(placeholder){
		fixture.expectedPlaceholder = placeholder;
		return fixture;
	};

	fixture.ExpectData = function(data){
		if (data){
			fixture.expectedData = ('' + Nexus.Util.serialize(data)).replace(/\s+/g, "");
		}else{
			throw 'ExpectData needs data parameter';
		}
		return fixture;
	};
	
	fixture.ExpectOnLoad = function(onLoad){
		if (onLoad){
			fixture.expectedOnLoad = ('' + Nexus.Util.serialize(onLoad)).replace(/\s+/g, "");
		}else{
			throw 'setActualOnLoad needs onLoad parameter';
		}	
		return fixture;
	};	
	
	fixture.GivenEventHandler = function(eventHandler){
		fixture.givenEventHandler = eventHandler;
		return fixture;
	};
	
	
	fixture.GivenEvent = function(givenEvent){
		fixture.givenEvent = givenEvent;
		return fixture;
	};
		
	
	fixture.setActualTemplate = function(template){
		fixture.actualTemplate = template;
		return fixture;
	};
	
	fixture.setActualPlaceholder = function(placeholder){
		fixture.actualPlaceholder = placeholder;
		return fixture;
	};
	
	fixture.setActualData = function(data){
		if (data){
			fixture.actualData = ('' + Nexus.Util.serialize(data)).replace(/\s+/g, "");
		}else{
			throw 'setActualData needs data parameter';
		}
		return fixture;
	};
	
	fixture.setActualOnLoad = function(onLoad){
		if (onLoad){
			fixture.actualOnLoad = ('' + Nexus.Util.serialize(onLoad)).replace(/\s+/g, "");
		}else{
			throw 'setActualOnLoad needs onLoad parameter';
		}		
		return fixture;
	};

	fixture.assert = function(expected, actual, whatAreYouTesting){
		fixture.errors += Nexus.TestHelper.assert(expected, actual, whatAreYouTesting);	
	};	
	
	fixture.assertView = function(){
		fixture.assert(fixture.expectedData, fixture.actualData, 'Data');
		fixture.assert(fixture.expectedPlaceholder, fixture.actualPlaceholder, 'Placeholder');		
		fixture.assert(fixture.expectedTemplate, fixture.actualTemplate, 'Template');		
		fixture.assert(fixture.expectedOnLoad, fixture.actualOnLoad, 'OnLoad');		
	};
	
	fixture.assertEventHandlerRegistration = function(){
		if (!fixture.givenEventHandler){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(fixture.givenEventHandler, 'event handler REGISTRATION');		
		}else if (!Nexus.EventBus.isRegistered(fixture.givenEventHandler)){
			fixture.errors += Nexus.TestHelper.getUnregisteredEventHandlerMessage(fixture.givenEventHandler.name);
		}	
	};
	
	fixture.handleEvent = function(){
		if (!fixture.givenEventHandler){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(fixture.givenEventHandler, 'event handler HANDLE METHOD');		
		}else{	
			if (fixture.givenEvent && fixture.givenEventHandler.handlesEvent == fixture.givenEvent.eventName){ 
				fixture.givenEventHandler.handle(fixture.givenEvent);	
			}else if (fixture.givenEvent && fixture.givenEventHandler.handlesEvent != fixture.givenEvent.eventName){ 	
				fixture.errors += Nexus.TestHelper.getEventNotHandledBySpecifiedEventHandlerMessage(
					fixture.givenEventHandler.name, 
					fixture.givenEvent.eventName, 
					fixture.givenEventHandler.handlesEvent);
			}else{
				fixture.givenEventHandler.handle();	
			}
		}	
	};
	
	fixture._nextTest = {
		Run: function(moduleId){
			Nexus.TestHelper.appendDoneToModule(moduleId);		
		}
	}
	
	fixture.Run = function(moduleId){
		setTimeout(function(){		
			// setup
			fixture._beforeTest();	
			
			// act	
			fixture.handleEvent();			
																		
			// assert
			fixture.assertEventHandlerRegistration();	
			fixture.assertView();			
			Nexus.TestHelper.renderAsserts(moduleId, fixture.name, fixture.errors);	
			
			// tear down
			fixture._afterTest();
			
			// next test in module																		
			fixture._nextTest.Run(moduleId);			
		},fixture.waitTime); 
	};	
	
						
};

/////////////////////////////////////////////////////
///////// BACKEND TEST //////////////////////////////
/////////////////////////////////////////////////////
Nexus.BackendTest = function(name, waitTime){
	var fixture = this;
	fixture.waitTime = waitTime || 0;		
	fixture.name = name;
	fixture.errors = '';
	
	fixture._beforeTest = function(){
		// setup 
		Nexus.isInTestMode = true;
		fixture.BACKUP = {
			JSON_GET: Nexus.jsonGET,
			JSON_POST: Nexus.jsonPOST,
			JSON_PUT: Nexus.jsonPUT,
			JSON_DELETE: Nexus.jsonDELETE
		};	
		// as per single responsibility principal, only single call should be made in event handler
		// this is why fixutre.actualPayload is set from all jsonXXX handlers
		Nexus.jsonGET = function(payload){	
			fixture.setActualPayload(payload, 'GET');
		};
		Nexus.jsonPOST = function(payload){	
			fixture.setActualPayload(payload,'POST');
		};
		Nexus.jsonPUT = function(payload){	
			fixture.setActualPayload(payload, 'PUT');
		};
		Nexus.jsonDELETE = function(payload){	
			fixture.setActualPayload(payload, 'DELETE');
		};		
	};
	
	fixture._afterTest = function(){
		// restore app state															
		Nexus.jsonGET = fixture.BACKUP.JSON_GET;
		Nexus.jsonPOST = fixture.BACKUP.JSON_POST;
		Nexus.jsonPUT = fixture.BACKUP.JSON_PUT;
		Nexus.jsonDELETE = fixture.BACKUP.JSON_DELETE;
		Nexus.isInTestMode = false;		
	};		
	
	fixture.ExpectPayload = function(payload){
		if (payload){
			fixture.expectedPayload = ('' + Nexus.Util.serialize(payload)).replace(/\s+/g, "");
		}else{
			throw 'ExpectPayload needs payload parameter';
		}	
		return fixture;
	};	

	fixture.ExpectType = function(type){
		fixture.expectedType = type;
		return fixture;
	}
	
	fixture.GivenEventHandler = function(eventHandler){
		fixture.givenEventHandler = eventHandler;
		return fixture;
	};
	
	
	fixture.GivenEvent = function(givenEvent){
		fixture.givenEvent = givenEvent;
		return fixture;
	};		
	
	fixture.setActualPayload = function(payload, type){
		if (payload){
			fixture.actualPayload = ('' + Nexus.Util.serialize(payload)).replace(/\s+/g, "");
		}else{
			throw 'setActualPayload needs payload parameter';
		}		
		if (type){
			fixture.actualType = type;
		}
		return fixture;
	};
	
	fixture.assert = function(expected, actual, whatAreYouTesting){
		fixture.errors += Nexus.TestHelper.assert(expected, actual, whatAreYouTesting);			
	};	
		
	fixture.assertPayload = function(){
		fixture.assert(fixture.expectedPayload, fixture.actualPayload, 'Payload');
		fixture.assert(fixture.expectedType, fixture.actualType, 'Type');
	};
	
	fixture.assertEventHandlerRegistration = function(){
		if (!fixture.givenEventHandler){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(fixture.givenEventHandler, 'event handler REGISTRATION');		
		}else if (!Nexus.EventBus.isRegistered(fixture.givenEventHandler)){
			fixture.errors += Nexus.TestHelper.getUnregisteredEventHandlerMessage(fixture.givenEventHandler.name);
		}	
	};
	
	fixture.handleEvent = function(){
		if (!fixture.givenEventHandler){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(fixture.givenEventHandler, 'event handler HANDLE METHOD');		
		}else{	
			if (fixture.givenEvent && fixture.givenEventHandler.handlesEvent == fixture.givenEvent.eventName){ 
				fixture.givenEventHandler.handle(fixture.givenEvent);	
			}else if (fixture.givenEvent && fixture.givenEventHandler.handlesEvent != fixture.givenEvent.eventName){ 	
				fixture.errors += Nexus.TestHelper.getEventNotHandledBySpecifiedEventHandlerMessage(
					fixture.givenEventHandler.name, 
					fixture.givenEvent.eventName, 
					fixture.givenEventHandler.handlesEvent);
			}else{
				fixture.givenEventHandler.handle();	
			}
		}	
	};
	
	fixture._nextTest = {
		Run: function(moduleId){
			Nexus.TestHelper.appendDoneToModule(moduleId);		
		}
	}
	
	fixture.Run = function(moduleId){
		setTimeout(function(){		
			// setup
			fixture._beforeTest();	
			
			// act	
			fixture.handleEvent();			
																		
			// assert
			fixture.assertEventHandlerRegistration();	
			fixture.assertPayload();			
			Nexus.TestHelper.renderAsserts(moduleId, fixture.name, fixture.errors);	
			
			// tear down
			fixture._afterTest();
			
			// next test in module																		
			fixture._nextTest.Run(moduleId);			
		},fixture.waitTime); 
	};	
	
						
};

/////////////////////////////////////////////////////
///////// RESOLVE ROUTE TEST ////////////////////////
/////////////////////////////////////////////////////
Nexus.ResolveRouteTest = function(name, waitTime){
	var fixture = this;
	fixture.name = name;
	fixture.errors = '';
	fixture.waitTime = waitTime || 0;	
	fixture.actualEvents = new Array();
	
	fixture.GivenRoute = function(route){
		fixture.givenRoute = route;
		return fixture;
	};
	
	fixture.ExpectEvents = function(events){
		fixture.expectedEvents = events;
		return fixture;
	};

	fixture._beforeTest = function(){
		fixture.BACKUP = {
			EVENT_BUS: Nexus.EventBus
		};		
		Nexus.EventBus = {
			publish: function(evt){
				fixture.actualEvents.push(evt);
			}
		}
	};

	fixture._afterTest = function(){
		Nexus.EventBus = fixture.BACKUP.EVENT_BUS;
	};
		
	fixture.assertNumberOfEvents = function(){
		fixture.errors += Nexus.TestHelper.assert(fixture.expectedEvents.length, fixture.actualEvents.length, 'Number of events');
	};	
	
	fixture.assertCorrectActualEvents = function(){
		var expectedEventsAsString = Nexus.Util.serialize(fixture.expectedEvents);
		var actualEventsAsString = Nexus.Util.serialize(fixture.actualEvents).replace(/, __origin__:"ROUTER"/g,'');
		fixture.errors += Nexus.TestHelper.assert(expectedEventsAsString, actualEventsAsString, 'Published vents');
	};

	fixture._nextTest = {
		Run: function(moduleId){
			Nexus.TestHelper.appendDoneToModule(moduleId);		
		}
	};	

	fixture.Run = function(moduleId){
		setTimeout(function(){		
			if (!fixture.givenRoute){
				fixture.errors += Nexus.TestHelper.assert('GivenRoute(...)', 'not specified', 'Given Route');
			}else{

//TODO: allow one or many events to be passed
	/*
				if (fixture.expectedEvents && !Nexus.Util.isArray(fixture.expectedEvents)){
					fixture.errors += Nexus.TestHelper.assert('Event Array', '???', 'Event Array');
				}.
	*/

				fixture._beforeTest();	

				// act				
				Nexus.Router.route(fixture.givenRoute);


				// assert
				fixture.assertNumberOfEvents();	
				fixture.assertCorrectActualEvents();
				

				// tear down
				fixture._afterTest();
			}
			
			Nexus.TestHelper.renderAsserts(moduleId, fixture.name, fixture.errors);	
			
			// next test in module																		
			fixture._nextTest.Run(moduleId);
		
		},fixture.waitTime); 
	};		
	
};

/////////////////////////////////////////////////////
///////// GENERATE ROUTE TEST ///////////////////////
/////////////////////////////////////////////////////
Nexus.GenerateRouteTest = function(name, waitTime){
	var fixture = this;
	fixture.name = name;
	fixture.errors = '';
	fixture.waitTime = waitTime || 0;	
	fixture.actualRoute = '';
	
	fixture.ExpectRoute = function(route){
		fixture.expectedRoute = route;
		return fixture;
	};
	
	fixture.GivenEvents = function(events){
		fixture.givenEvents = events;
		return fixture;
	};

	fixture.assertRoute = function(){
		fixture.errors += Nexus.TestHelper.assert
		(
			fixture.expectedRoute, 
			Nexus.Router.replaceRouteVariables
				(
					Nexus.Router.matchRoute(fixture.givenEvents),
					fixture.givenEvents
				)
		, 'Generated route'
		);	
	};

	fixture._nextTest = {
		Run: function(moduleId){
			Nexus.TestHelper.appendDoneToModule(moduleId);		
		}
	};	

	fixture.Run = function(moduleId){
		setTimeout(function(){	
		
			// act				
			fixture._publishGivenEvents

			// assert
			fixture.assertRoute();	
			
			// render asserts
			Nexus.TestHelper.renderAsserts(moduleId, fixture.name, fixture.errors);	
			
			// next test in module																		
			fixture._nextTest.Run(moduleId);
		
		},fixture.waitTime); 
	};		
	
};



});


