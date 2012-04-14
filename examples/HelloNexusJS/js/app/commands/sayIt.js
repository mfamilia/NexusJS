define(function () {
	
	var SayIt = {
	
		commandName: "Say it",		
	
		Command: function(selector, date, text){
			return {
				selector: selector,
				date: date,
				text: text,
				commandName: SayIt.commandName
			};
		}	
	};
	
	return SayIt;
	
});



