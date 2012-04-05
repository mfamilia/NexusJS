define([
	"Nexus",
	"app/commands/displayMainScreen",
	"app/domain/mainScreen"	
], function (Nexus, DisplayMainScreen) {

	return new Nexus.CommandHandler(
		'Display main screen command handler',	
		DisplayMainScreen.commandName,
		function(cmd){
			new Nexus.App.Domain.MainScreen(cmd.id, cmd.date);
		}		
	);	

});

