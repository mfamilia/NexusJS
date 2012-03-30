define([
	"app/commands/buyerCommandNames"
], function (BuyerCommandNames) {
	
	return {
		PopulateBuyersCommand: function(buyers){
			this.buyers = buyers;
			this.commandName = BuyerCommandNames.populateBuyersCommandName;
		}	
	};
	
});



