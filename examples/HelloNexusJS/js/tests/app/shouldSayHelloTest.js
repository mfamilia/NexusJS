define([
	"Nexus",
	"app/commands/sayHello",
	"app/events/helloScreenDisplayed",
	"app/commands/displayMainScreen"
], function (Nexus, SayHello, HelloScreenDisplayed, DisplayMainScreen) {
		
		return function(){
			var id = Nexus.App.newId();
			var date = new Date();
			var whenCommand = SayHello.Command(id, date);
			var expectEvents = HelloScreenDisplayed.Event(id, date);		


			var expectedView = {
				template: 'helloTemplate.html',
				placeholder: '#output'
			};

			new Nexus
			.Test('Should say hello')
			.Given(new DisplayMainScreen.Command(id, date))
			.When(whenCommand)
			.Then(expectEvents)
			.ExpectRenderedView(expectedView)
			.Run();
		};
			   
});


