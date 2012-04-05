define([
	"Nexus",
	"app/domain/buyer",
	"app/commands/buyerCommandNames",
	"app/services/aggregateService"	
], function (Nexus, BUYER, BuyerCommandNames) {

	var buyerCommandHandlers = new Array();

	buyerCommandHandlers.push(new Nexus.CommandHandler(
		'Populate buyers command handler',	
		BuyerCommandNames.populateBuyersCommandName,
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
	));
	
	buyerCommandHandlers.push(new Nexus.CommandHandler(
		'Authenticate buyer command handler',	
		BuyerCommandNames.authenticateBuyerCommandName,
		function(cmd){
			Nexus.App.Services.AggregateService.Buyer.getStaticBuyer().authenticate(cmd.date, cmd.userId, cmd.password);	
		}		
	));	

	return buyerCommandHandlers;

})

