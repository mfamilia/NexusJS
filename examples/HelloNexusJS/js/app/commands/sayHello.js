define(function () {
	
	var SayHello = {
	
		commandName: "Say hello",		
	
		Command: function(id, date){
			return {
				id: id,
				date: date,
				commandName: SayHello.commandName
			};
		}	
	};
	
	return SayHello;
	
});



