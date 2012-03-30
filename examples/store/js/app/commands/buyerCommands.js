require([
	"Nexus",
	"Nexus.App.Commands.BuyerCommandNames"
], function (Nexus) {
	
	Nexus.App.Commands.BuyerCommands = {

		PopulateBuyersCommand: function(buyers){
			this.buyers = buyers;
			this.commandName = Nexus.App.Commands.BuyerCommandNames.populateBuyersCommandName;
		}	
	};
	
});



