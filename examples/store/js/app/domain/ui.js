require([
	"Nexus",
	"app/events/uiEvents",
	"app/events/uiEventNames"
], function (Nexus, UIEvents, UIEventNames) {
	
	Nexus.App.Domain.UI = function (userId, password, date) {

		Nexus.App.EventBus.publish(new UIEvents.LoginFormDisplayedEvent());	
/*
		var validator = new Nexus.App.Validators.BuyerAuthenticationValidator(date, userId);
		if(Nexus.Helpers.Validation.isValid(validator)){
			Nexus.App.EventBus.publish(new UIEvents.HomePageDisplayedEvent(date, userId));	
			
		}							
*/
		
		this.applyEvent = function(evt){};
	}; 

});

