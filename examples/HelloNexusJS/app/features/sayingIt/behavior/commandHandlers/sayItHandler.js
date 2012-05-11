define([
	"Nexus",
	"app/features/sayingIt/behavior/commands/sayIt",
	"app/shared/businessLogic/domain/homePage"	
], function (Nexus, SayIt, HomePage) {

	return new Nexus.CommandHandler(
		'Say it command handler',	
		SayIt.commandName,
		function(cmd){
			new HomePage().sayIt(cmd.selector, cmd.date, cmd.text);	
		}		
	);	

});

