define([
	"Nexus",
	"app/features/sayingHello/commands/sayHello",
	"app/shared/domain/homePage"	
], function (Nexus, SayHello, HomePage) {

	return new Nexus.CommandHandler(
		'Say hello command handler',	
		SayHello.commandName,
		function(cmd){
			new HomePage().sayHello(cmd.id, cmd.date);
		}		
	);	

});

