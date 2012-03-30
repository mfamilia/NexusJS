require([
	"Nexus",
	"Nexus.App.Commands.BuyerCommandNames",
	"Nexus.App.Domain.Buyer"
], function (Nexus) {

	var ch = new Nexus.CommandHandler(
		'Nexus.App.CommandHandlers.BuyerCommandHandlers.populateBuyersCommandHandler',	
		Nexus.App.Commands.BuyerCommandNames.populateBuyersCommandName,
		function(cmd){
			cmd.buyers.map(function(buyer){
				new Nexus.App.Domain.Buyer(
					buyer.id, 
					buyer.firstName, 
					buyer.lastName, 
					buyer.userId, 
					buyer.password
				);
			});		
		}		
	);
	
	Nexus.App.CommandBus.registerCommandHandlers([ch]);

});

