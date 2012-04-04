define([
	"app/commands/buyerCommandNames"
], function (BuyerCommandNames) {
	
	return {
		PopulateBuyersCommand: function(buyers){
			this.buyers = buyers;
			this.commandName = BuyerCommandNames.populateBuyersCommandName;
		},
		AuthenticateBuyerCommand: function(date, userId, password){
			this.date = date;
			this.userId = userId;
			this.password = password;
			this.commandName = BuyerCommandNames.authenticateBuyerCommandName;
		}	
	};
	
});



