define(function () {

	var ErrorRaised = {
		eventName:  'Error raised',	
		
		Event: function(msg){	
			return {
				msg: msg,
				eventName: ErrorRaised.eventName
			};
		}	
	};

	return ErrorRaised;

	

	

});
