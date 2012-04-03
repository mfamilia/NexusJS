define([
	"app/commands/uiCommandNames"
], function (UICommandNames) {
	
	return {
		StartUICommand: function(userId, password, date){
			this.userId = userId;
			this.password = password;
			this.date = date;
			this.commandName = UICommandNames.startUICommandName;
		}	
	};
	
});



