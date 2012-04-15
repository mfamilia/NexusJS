define([
	'jquery',
	'Nexus',
	"app/events/homePageDisplayed",	
	'app/commands/sayHello',
	'app/commands/sayIt'
], function ($, Nexus, HomePageDisplayed, SayHello, SayIt) {
	
	return new Nexus.EventHandler(
		'Home page displayed event handler',
		HomePageDisplayed.eventName,
		function(evt){
								
			new Nexus.View({
				template: 'homePageTemplate.html',
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
