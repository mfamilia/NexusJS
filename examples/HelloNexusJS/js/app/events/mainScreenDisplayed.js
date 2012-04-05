define(function () {

	var MainScreenDisplayed = {
		eventName:  'Main screen displayed',	
		
		Event: function(id, date){	
			this.id = id;
			this.date = date;
			this.eventName = MainScreenDisplayed.eventName;
		}	
	};
	
	return MainScreenDisplayed;

});
