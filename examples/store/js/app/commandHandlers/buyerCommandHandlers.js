define([
	"Nexus",
	"app/commands/buyerCommandNames",
	"app/domain/buyer"
], function (Nexus, BuyerCommandNames) {

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

	return buyerCommandHandlers;

})

