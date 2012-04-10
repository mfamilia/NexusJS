define(function () {
	
	var SayHello = {
	
		commandName: "Say hello",		
	
		Command: function(id, date){
			this.id = id;
			this.date = date;
			this.commandName = SayHello.commandName;
		}	
	};
	
	return SayHello;
	
});



