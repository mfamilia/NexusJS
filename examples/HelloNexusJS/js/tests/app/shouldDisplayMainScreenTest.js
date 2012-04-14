define([
	"Nexus",
], function (Nexus) {

	return function () {	
		// Arrange	
		var id = Nexus.App.newId();
		var date = new Date();
				
		var mainScreenDisplayedEvent = {
			id: id,
			date: date,
			eventName: 'Main screen displayed'
		};
		
		var displayMainScreenCommand = {
			id: id,
			date: date,
			commandName: "Display main screen"
		};		
		
		var expectedView = {
			template: 'mainTemplate.html', // template to be rendered
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
		.Test('Should display main screen')
		// Behavior
		.When(displayMainScreenCommand)
		.Then(mainScreenDisplayedEvent)
		// UI
		.ExpectView(expectedView)
		.Run();					
	};
			    
});


