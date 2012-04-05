define(function () {
	
	var DisplayMainScreen = {
	
		commandName: "Display main screen",		
	
		Command: function(id, date){
			this.id = id;
			this.date = date;
			this.commandName = DisplayMainScreen.commandName;
		}	
	};
	
	return DisplayMainScreen;
	
});



