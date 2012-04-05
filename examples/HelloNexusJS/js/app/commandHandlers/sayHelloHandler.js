define([
	"Nexus",
	"app/commands/sayHello",
	"app/domain/mainScreen"	
], function (Nexus, SayHello) {

	return new Nexus.CommandHandler(
		'Say hello command handler',	
		SayHello.commandName,
		function(cmd){
			new Nexus.App.Domain.HelloScreen(cmd.id, cmd.date);
		}		
	);	

});

