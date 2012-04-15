define(function () {

	var DisplayHomePage = {
	
		commandName: "Display home page",		
	
		Command: function(id, date){
			return {
				id: id,
				date: date,
				commandName: DisplayHomePage.commandName
			};
		}	
	};
	
	
	return DisplayHomePage;
	
});



