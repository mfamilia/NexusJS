define(function () {

	var SaidIt = {
		eventName:  'Said it',	

		Event: function(selector, date, text){	
			return {
				selector: selector,
				date: date,
				text: text,
				eventName: SaidIt.eventName
			};
		}	
			
	};
	
	return SaidIt;

});
