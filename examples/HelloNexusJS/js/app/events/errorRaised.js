define(function () {

	var ErrorRaised = {
		eventName:  'Error raised',	
		
		Event: function(msg){	
			this.msg = msg;
			this.eventName = ErrorRaised.eventName;
		}	
	};

	return ErrorRaised;

	

	

});
