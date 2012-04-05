define(function () {

	var HelloScreenDisplayed = {
		eventName:  'Hello screen displayed',	
		
		Event: function(id, date){	
			this.id = id;
			this.date = date;
			this.eventName = HelloScreenDisplayed.eventName;
		}	
	};
	
	return HelloScreenDisplayed;

});
