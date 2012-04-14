define(function () {

	var Highlighted = {
		eventName:  'Highlighted',	
		
		Event: function(selector){	
			return {
				selector: selector,
				eventName: Highlighted.eventName
			};
		}	
	};
	
	return Highlighted;

});
