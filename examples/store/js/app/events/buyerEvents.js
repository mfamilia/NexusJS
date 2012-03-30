require([
	"Nexus",
	"Nexus.App.Events.BuyerEventNames"
], function (Nexus) {
	
	Nexus.App.Events.BuyerEvents = {

		BuyerCreatedEvent: function(id, firstName, lastName, userId, password){
			this.id = id;
			this.firstName = firstName;
			this.lastName = lastName;
			this.userId = userId;
			this.password = password;
			this.eventName = Nexus.App.Events.BuyerEventNames.buyerCreatedEventName;
		}	

	};

	
});





