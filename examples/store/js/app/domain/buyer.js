define([
	"Nexus",
	"Nexus.App.Events.BuyerEvents",
	"Nexus.App.Events.BuyerEventNames"
], function (Nexus, BuyerEvents) {
	
	Nexus.App.Domain.Buyer = function (id, firstName, lastName, userId, password) {

		this.id = '';
		this.firstName = '';
		this.lastName = '';
		this.userId = '';
		this.password = '';	

		Nexus.App.EventBus.publish(new Nexus.App.Events.BuyerEvents.BuyerCreatedEvent(id, firstName, lastName, userId, password));	
		

		this.applyEvent = function(evt){
			if (evt.eventName == Nexus.App.Events.BuyerEventNames.buyerCreatedEventName){
				this.id = evt.id;
				this.firstName = evt.firstName;
				this.lastName = evt.lastName;
				this.userId = evt.userId;
				this.password = evt.password;		
				
			}
		};

	};

});

