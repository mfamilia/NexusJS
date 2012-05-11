define(function () {

	var HomePageDisplayed = {
		eventName:  'Home page displayed',	
		
		Event: function(id, date){
			return {
				id: id,
				date: date,
				eventName: HomePageDisplayed.eventName
			};
		}	
	};	
	
	return HomePageDisplayed;

});
