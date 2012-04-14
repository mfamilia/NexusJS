define([
	"Nexus",
], function (Nexus) {

	return function () {	
		// arrange	
		var id = Nexus.App.newId();
		var date = new Date();
				
		var expectedEvent = {
			id: id,
			date: date,
			eventName: 'Main screen displayed'
		};
		
		var expectedCommand = {
			id: id,
			date: date,
			commandName: "Display main screen"
		};		

		// act/assert (behavior, ui, commands, events)
		new Nexus
		.Test('Should display main screen')
		.When(expectedCommand)
		.Then(expectedEvent)
		.ExpectRenderedView({
			template: 'mainTemplate.html', // template to be rendered
			placeholder: '#body', // where should it be rendered
			onLoad: function(){
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
				  				
		})
		.Run();					
	};
			    
});


