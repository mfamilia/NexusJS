define([
	'jquery',
	'Nexus',
	"app/events/mainScreenDisplayed",	
	'app/commands/sayHello',
	'app/commands/sayIt'
], function ($, Nexus, MainScreenDisplayed, SayHello, SayIt) {
	
	return new Nexus.EventHandler(
		'Main screen displayed event handler',
		MainScreenDisplayed.eventName,
		function(evt){
								
			new Nexus.View({
				template: 'mainTemplate.html',
				placeholder: '#body',		
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
			.render();			
		}	
	);
	
});
