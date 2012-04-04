define([
	"Nexus",
	"app/events/uiEventNames"
], function (Nexus, UIEventNames) {

	var eventHandlers = new Array();
	
	Nexus.App.EventHandlers.LoginFormDisplayedEventHandler =
	new Nexus.EventHandler(
			'Login form displayed event handler',
			UIEventNames.loginFormDisplayedEventName,
			function(evt){
				Nexus.App.UI.renderView(evt, 'loginForm.html','#body');	
				Nexus.App.UI.applyFunction(function(){alert('hello')});
			}	
	);
	
	eventHandlers.push(Nexus.App.EventHandlers.LoginFormDisplayedEventHandler);	
	
	return eventHandlers;

});
