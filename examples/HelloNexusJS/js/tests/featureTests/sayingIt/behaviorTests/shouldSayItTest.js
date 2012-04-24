define([
	"Nexus"
], function (Nexus) {

	var id = Nexus.newId();
	var date = new Date();
	var text = 'hello';
	var selector = '#thingToSay';
	
	var mainScreenDisplayedEvent = {
		id: id,
		date: date,
		eventName: 'Main screen displayed'
	};		
	var sayItCommand = {
		selector: selector,
		date: date,
		text: text,
		commandName: 'Say it'		
	};
	var saidItEvent = {
		selector: selector,
		date: date,
		text: text,
		eventName: 'Said it'		
	};
	
	return new Nexus
	.BehaviorTest('Should say it',300)
		.Given(mainScreenDisplayedEvent)
		.When(sayItCommand)
		.Then(saidItEvent);
			    
});


