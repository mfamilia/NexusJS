define(function () {

	var DisplayMainScreen = {
	
		commandName: "Display main screen",		
	
		Command: function(id, date){
			return {
				id: id,
				date: date,
				commandName: DisplayMainScreen.commandName
			};
		}	
	};
	
	
	return DisplayMainScreen;
	
});



