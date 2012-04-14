define([
	"Nexus",
	"app/commands/sayHello",
	"app/events/helloScreenDisplayed",
	"app/commands/displayMainScreen"
], function (Nexus, SayHello, HelloScreenDisplayed, DisplayMainScreen) {
		
		return function(){
			// Arrange
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

			var expectedView = {
				template: 'helloTemplate.html',
				placeholder: '#output'
			};

			// Act/Assert
			new Nexus
			.Test('Should say hello')
			// Behavior
			.Given(mainScreenDisplayedEvent)
			.When(sayHelloCommand)
			.Then(helloScreenDisplayedEvent)
			// UI
			.ExpectView(expectedView)
			.Run();
		};
			   
});


