define([
	"Nexus",
	"app/commands/sayHello",
	"app/events/helloScreenDisplayed"
], function (Nexus, SayHello, HelloScreenDisplayed) {
		
		return function(){
			var id = Nexus.App.newId();
			var date = new Date();
			var whenCommand = new SayHello.Command(id, date);
			var expectEvents = new HelloScreenDisplayed.Event(id, date);		
			
			var expectedOnUI = {
				template: 'helloScreen.html',
				placeholder: '#body'
			};	
			
			new Nexus
				.Test('Should say hello')
					.BeforeTest()
						.Given()
						.When(whenCommand)
						.Then(expectEvents)
					.AfterTest()
				.Run(expectedOnUI, 50);	// 50 is a number of miliseconds to wait before making assertions							
		};
			    
});


