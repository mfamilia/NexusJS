define([
	"Nexus",
	"app/commands/sayIt",
	"app/events/saidIt",
	"app/events/mainScreenDisplayed",
	"app/domain/mainScreen"
], function (Nexus, SayIt, SaidIt, MainScreenDisplayed) {
		
	return function(){
		// Arrange
		var id = Nexus.App.newId();
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
		var expectedView = {
			template: 'saidItTemplate.html',
			placeholder: '#output',
			data: saidItEvent,
			onLoad: 
			function(){
				var cssObj = {
					'border' : '1px solid Gray'
				};
				$(evt.selector).css(cssObj);						
			}									
		};

		// Act/Assert
		new Nexus
		.Test('Should say it')
		// Behavior
		.Given(mainScreenDisplayedEvent)
		.When(sayItCommand)
		.Then(saidItEvent)
		// UI
		.ExpectView(expectedView)
		.Run();					
	};
			    
});


