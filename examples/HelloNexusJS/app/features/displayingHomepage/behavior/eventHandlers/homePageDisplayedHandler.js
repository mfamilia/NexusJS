define([
	'jquery',
	'Nexus',
	"app/features/displayingHomepage/behavior/events/homePageDisplayed",
	'app/features/sayingHello/behavior/commands/sayHello',
	'app/features/sayingIt/behavior/commands/sayIt'
], function ($, Nexus, HomePageDisplayed, SayHello, SayIt) {
	
	return new Nexus.EventHandler(
		'Home page displayed event handler',
		HomePageDisplayed.eventName,
		function(evt){
								
			new Nexus.View({
				template: 'app/features/displayingHomepage/ui/templates/homePageTemplate.html',
				placeholder: '#body',		
				onLoad: function(){
					$('#sayHello').click(function () {
						Nexus.CommandBus.dispatch(
							SayHello.Command(Nexus.newId(), new Date)			
						);	
					});
					$('#sayIt').click(function () {
						var text = $('#thingToSay').val();						
						Nexus.CommandBus.dispatch(
							SayIt.Command('#thingToSay', new Date, text)
						);		
					});						
				}
			})
			.render();			
		}	
	);
	
});
