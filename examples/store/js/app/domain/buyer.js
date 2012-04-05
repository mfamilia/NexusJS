require([
	"Nexus",
	"app/events/buyerEvents",
	"app/events/buyerEventNames",
	"app/services/backendRestService",
	"app/validators/lengthValidator"
], function (Nexus, BuyerEvents, BuyerEventNames, backendRestService, LengthValidator) {
	
	Nexus.App.Domain.Buyer = function (id, firstName, lastName, userId, password) {
		this.id = '';
		this.firstName = '';
		this.lastName = '';
		this.userId = '';
		this.password = '';	

		Nexus.App.EventBus.publish(new BuyerEvents.BuyerCreatedEvent(id, firstName, lastName, userId, password));	
		
		this.authenticate = function(date, userId, password){			
			// ui validator (can be an array of them)
			var validator = new LengthValidator(password, 6, 16);
			
			// if ui is valid, call backend
			if(Nexus.Helpers.Validation.isValid(validator)){
				// call rest backend service in async way
				backendRestService.post({
					url: 'http://www.some.back.end.server',
					data: {userId:userId, password:password},
					success: function(data){
						Nexus.App.EventBus.publish(
							new BuyerEvents.BuyerAuthenticatedEvent(data)
						);				
					},
					error: function(){
						Nexus.App.EventBus.publish(
							new BuyerEvents.Http404PageDisplayedEvent()					
						);				
					}
				});
			}			


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

