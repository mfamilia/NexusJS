define(function () {
	
	var SayIt = {
	
		commandName: "Say it",		
	
		Command: function(id, date, text, viewModel){
			this.id = id;
			this.date = date;
			this.text = text;
			this.commandName = SayIt.commandName;
		}	
	};
	
	return SayIt;
	
});



