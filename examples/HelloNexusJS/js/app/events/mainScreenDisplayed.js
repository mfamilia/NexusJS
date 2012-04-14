define(function () {

	var MainScreenDisplayed = {
		eventName:  'Main screen displayed',	
		
		Event: function(id, date){
			return {
				id: id,
				date: date,
				eventName: MainScreenDisplayed.eventName
			};
		}	
	};	
	
	return MainScreenDisplayed;

});
