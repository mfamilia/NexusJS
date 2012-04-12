define(function () {
	
	var SayIt = {
	
		commandName: "Say it",		
	
		Command: function(selector, date, text){
			this.selector = selector;
			this.date = date;
			this.text = text;
			this.commandName = SayIt.commandName;
		}	
	};
	
	return SayIt;
	
});



