define([
	"Nexus",
], function (Nexus) {

	return function () {	
		// Arrange	
		var id = Nexus.App.newId();
		var date = new Date();
				
		var homePageDisplayedEvent = {
			id: id,
			date: date,
			eventName: 'Home page displayed'
		};
		
		var displayHomePageCommand = {
			id: id,
			date: date,
			commandName: "Display home page"
		};		
		
		var expectedView = {
			template: 'homePageTemplate.html', // template to be rendered
			placeholder: '#body', // where should it be rendered
			onLoad: // what should execute on view load
			function(){
				$('#sayHello').click(function () {
					Nexus.App.CommandBus.dispatch(
						SayHello.Command(Nexus.App.newId(), new Date)		
					);	
				});
				$('#sayIt').click(function () {
					var text = $('#thingToSay').val();
					Nexus.App.CommandBus.dispatch(
						SayIt.Command('#thingToSay', new Date, text)
					);		
				});						
			}	
				  				
		};

		// Act/Assert
		new Nexus
		.Test('Should display home page')
		// Behavior
		.When(displayHomePageCommand)
		.Then(homePageDisplayedEvent)
		// UI
		.ExpectView(expectedView)
		.Run();					
	};
			    
});


