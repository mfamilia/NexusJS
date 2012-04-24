define([
	"Nexus",
	"app/features/displayingHomepage/commands/displayHomePage",
	"app/shared/domain/homePage"	
], function (Nexus, DisplayHomePage, HomePage) {

	return new Nexus.CommandHandler(
		'Display home page command handler',	
		DisplayHomePage.commandName,
		function(cmd){
			new HomePage().load(cmd.id, cmd.date);	
		}		
	);	

});

