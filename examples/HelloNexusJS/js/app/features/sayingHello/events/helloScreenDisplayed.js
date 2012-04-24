define(function () {

	var HelloScreenDisplayed = {
		eventName:  'Hello screen displayed',	
		
		Event: function(id, date){	
			return {
				id: id,
				date: date,
				eventName: HelloScreenDisplayed.eventName
			};
		}	
	};
	
	return HelloScreenDisplayed;

});
