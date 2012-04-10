define([
	"Nexus",
	"app/commands/sayIt",
	"app/domain/mainScreen"	
], function (Nexus, SayIt, MainScreen) {

	return new Nexus.CommandHandler(
		'Say it command handler',	
		SayIt.commandName,
		function(cmd){
			new MainScreen().sayIt(cmd.id, cmd.date, cmd.text);	
		}		
	);	

});

