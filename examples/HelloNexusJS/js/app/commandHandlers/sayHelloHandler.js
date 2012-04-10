define([
	"Nexus",
	"app/commands/sayHello",
	"app/domain/mainScreen"	
], function (Nexus, SayHello, MainScreen) {

	return new Nexus.CommandHandler(
		'Say hello command handler',	
		SayHello.commandName,
		function(cmd){
			new MainScreen().sayHello(cmd.id, cmd.date);
		}		
	);	

});

