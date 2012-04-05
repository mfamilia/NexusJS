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
		},
		
		BuyerAuthenticatedEvent: function(data){
			this.data = data;
			this.eventName = BuyerEventNames.buyerAuthenticatedEventName;
		},
		
		Http404PageDisplayedEvent: function(){
			this.eventName = BuyerEventNames.http404PageDisplayedEventName;					
		}	

	};

});





