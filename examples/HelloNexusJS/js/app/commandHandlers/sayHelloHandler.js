define([
	"Nexus",
	"app/commands/sayHello",
	"app/domain/homePage"	
], function (Nexus, SayHello, HomePage) {

	return new Nexus.CommandHandler(
		'Say hello command handler',	
		SayHello.commandName,
		function(cmd){
			new HomePage().sayHello(cmd.id, cmd.date);
		}		
	);	

});

