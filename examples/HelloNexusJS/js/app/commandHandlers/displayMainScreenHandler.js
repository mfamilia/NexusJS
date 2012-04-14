define([
	"Nexus",
	"app/commands/displayMainScreen",
	"app/domain/mainScreen"	
], function (Nexus, DisplayMainScreen, MainScreen) {

	return new Nexus.CommandHandler(
		'Display main screen command handler',	
		DisplayMainScreen.commandName,
		function(cmd){
			new MainScreen().load(cmd.id, cmd.date);	
		}		
	);	

});

