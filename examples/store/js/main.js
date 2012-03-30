require.config({
  paths: {
    "jquery": 'lib/jquery',
    "mustache": 'lib/mustache',
    "text": 'lib/text',
    
    "Nexus": 'lib/nexus',
    "App": 'app/app', 
    
    "Nexus.App.Commands.BuyerCommandNames": 'app/commands/buyerCommandNames',
    "Nexus.App.Commands.BuyerCommands": 'app/commands/buyerCommands',
    
    "Nexus.App.CommandHandlers.BuyerCommandHandlers": 'app/commandHandlers/buyerCommandHandlers',    
    
    "Nexus.App.Domain.Buyer": 'app/domain/buyer',
    
    "Nexus.App.Events.BuyerEventNames": 'app/events/buyerEventNames',
    "Nexus.App.Events.BuyerEvents": 'app/events/buyerEvents',
    
    "Nexus.App.EventHandlers.BuyerEventHandlers": 'app/eventHandlers/buyerEventHandlers',
    
    "Nexus.App.DTOs.BuyerDTOs": 'app/dtos/buyerDtos'
    
    
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


require([
	"jquery",
	"Nexus",
	"Nexus.App.Commands.BuyerCommands"
], function($, Nexus) {
	$('#clickMe2').click(function () {
		var x = new Nexus.App.Commands.BuyerCommands.PopulateBuyersCommand("some buyers 2");
		var y = new Nexus.App.Commands.BuyerCommands.PopulateBuyersCommand("bc bc bc");
	
		
		console.log(JSON.stringify(y));

		$('#result').html(JSON.stringify(x));		
	});	
});

