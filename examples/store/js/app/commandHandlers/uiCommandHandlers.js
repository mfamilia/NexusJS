define([
	"Nexus",
	"app/commands/uiCommandNames",
	"app/domain/ui"
], function (Nexus, UICommandNames) {

	var uiCommandHandlers = new Array();


	uiCommandHandlers.push(new Nexus.CommandHandler(
		'Start UI command handler',	
		UICommandNames.startUICommandName,
		function(cmd){
			new Nexus.App.Domain.UI();	
		}		
	));	

	return uiCommandHandlers;
	

})

