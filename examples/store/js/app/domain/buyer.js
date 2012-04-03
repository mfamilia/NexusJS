require([
	"Nexus",
	"app/events/buyerEvents",
	"app/events/buyerEventNames"
], function (Nexus, BuyerEvents, BuyerEventNames) {
	
	Nexus.App.Domain.Buyer = function (id, firstName, lastName, userId, password) {
		this.id = '';
		this.firstName = '';
		this.lastName = '';
		this.userId = '';
		this.password = '';	

		Nexus.App.EventBus.publish(new BuyerEvents.BuyerCreatedEvent(id, firstName, lastName, userId, password));	
		
		this.applyEvent = function(evt){
			if (evt.eventName == BuyerEventNames.buyerCreatedEventName){
				this.id = evt.id;
				this.firstName = evt.firstName;
				this.lastName = evt.lastName;
				this.userId = evt.userId;
				this.password = evt.password;		
				
			}
		};

	}; 

});

