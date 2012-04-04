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
		
		this.authenticate = function(date, userId, password){
			var postData = {userId: userId, pwd: password};
			
console.log('auth');			
					
			$.ajax({
				url: 'http://some.backend.server.com',
				type: 'POST',
				data: JSON.stringify(postData),
				dataType: 'json',
				contentTypeString: 'application/json',
				// success callback
				success: function(data, textStatus, jqXHR){
					Nexus.App.EventBus.publish(
						new BuyerEvents.BuyerAuthenticatedEvent(data)
					);									
				},
				// error callback
				error: function(jqXHR, textStatus, errorThrown){
console.log('err');				
					Nexus.App.EventBus.publish(
							new BuyerEvents.Http404PageDisplayedEvent()					
					);									
				}			
			});

		};
		
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

