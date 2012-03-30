require.config({
  paths: {
    "jquery": 'lib/jquery',
    "mustache": 'lib/mustache',
    "text": 'lib/text',
    "qunit": 'lib/qunit',
    
    "Nexus": 'lib/nexus',
    "App": 'app/app', 
    
    "Nexus.App.Commands.BuyerCommandNames": 'app/commands/buyerCommandNames',
    "Nexus.App.Commands.BuyerCommands": 'app/commands/buyerCommands',
    
    "Nexus.App.CommandHandlers.BuyerCommandHandlers": 'app/commandHandlers/buyerCommandHandlers',    
    
    "Nexus.App.Domain.Buyer": 'app/domain/buyer',
    
    "Nexus.App.Events.BuyerEventNames": 'app/events/buyerEventNames',
    "Nexus.App.Events.BuyerEvents": 'app/events/buyerEvents',
    
    "Nexus.App.EventHandlers.BuyerEventHandlers": 'app/eventHandlers/buyerEventHandlers',
    
    "Nexus.App.DTOs.BuyerDTOs": 'app/dtos/buyerDtos',
    
    "Nexus.App.Tests.BuyerTests": 'app/tests/behaviorTests/buyerTests'
    
    
  }

});

require(["Nexus","App"], function(Nexus,App) {
	Nexus.App.init();
});

require([
	"Nexus.App.CommandHandlers.BuyerCommandHandlers", 
	"Nexus.App.EventHandlers.BuyerEventHandlers"
], function() {
	// register command handlers
	// register event handlers
});



require([
	"jquery",
	"Nexus",
	"Nexus.App.Commands.BuyerCommands"
], function($, Nexus) {
	$('#populateBuyers').click(function(){
		var buyers = [
			{
				id: Nexus.App.newId(),
				firstName: 'Buyer',
				lastName: 'One',
				userId: 'bone',
				password: 'pwd'
			},
			{
				id: Nexus.App.newId(),
				firstName: 'Buyer',
				lastName: 'Two',
				userId: 'btwo',
				password: 'pwd'
			}					
		];
					
		Nexus.App.CommandBus.dispatch(
			new Nexus.App.Commands.BuyerCommands.PopulateBuyersCommand(
				buyers
			)
		);
	});
});


require(["jquery","Nexus","qunit","Nexus.App.Tests.BuyerTests"],function($, Nexus,QUnit){

	$('#performTest').click(function () {
		Nexus.App.Analytics.EnabledForCommands = false;
		Nexus.App.Analytics.EnabledForEvents = false;

		Nexus.App.Tests.BuyerTests.shouldInitBuyers();

		Nexus.App.Analytics.EnabledForCommands = true;
		Nexus.App.Analytics.EnabledForEvents = true;        	        
	});
});
