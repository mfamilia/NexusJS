define([
	"app/events/buyerEventNames"
], function (BuyerEventNames) {
	
	return {

		BuyerCreatedEvent: function(id, firstName, lastName, userId, password){
			this.id = id;
			this.firstName = firstName;
			this.lastName = lastName;
			this.userId = userId;
			this.password = password;
			this.eventName = BuyerEventNames.buyerCreatedEventName;
		}	

	};

});





