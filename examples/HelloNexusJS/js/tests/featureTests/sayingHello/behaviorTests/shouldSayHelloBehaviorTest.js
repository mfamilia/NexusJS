define([
	"Nexus"
], function (Nexus) {
		
	var id = Nexus.newId();
	var date = new Date();
	
	var mainScreenDisplayedEvent = {
		id: id,
		date: date,
		eventName: 'Main screen displayed'
	};
	
	var sayHelloCommand = {
		id: id,
		date: date,
		commandName: 'Say hello'
	};
	var helloScreenDisplayedEvent = {
		id: id,
		date: date,
		eventName: 'Hello screen displayed'
	};

	return new Nexus
	.BehaviorTest('Should say hello', 600)
		.Given(mainScreenDisplayedEvent)
		.When(sayHelloCommand)
		.Then(helloScreenDisplayedEvent);
			   
});


