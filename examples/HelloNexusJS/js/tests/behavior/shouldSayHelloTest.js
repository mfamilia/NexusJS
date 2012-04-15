define([
	"Nexus"
], function (Nexus) {
		
	var id = Nexus.App.newId();
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
	.BehaviorTest('Should say hello')
		.Given(mainScreenDisplayedEvent)
		.When(sayHelloCommand)
		.Then(helloScreenDisplayedEvent);
			   
});


