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
			Nexus.View
			.forTemplate('mainTemplate.html')
			.renderOn('#body')
			.bind(function(){
				$().ready(function(){
					$('#sayHello').click(function () {
						Nexus.App.CommandBus.dispatch(
							new SayHello.Command(Nexus.App.newId(), new Date())			
						);	
					});
					$('#sayIt').click(function () {
						var text = $('#thingToSay').val();
						Nexus.App.CommandBus.dispatch(
							new SayIt.Command('#thingToSay', new Date(), text)
						);		
					});	
				});					
			});
		}	
	);
	
});
