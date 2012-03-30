define([
	"Nexus",
	"app/events/buyerEventNames",
	"app/dtos/buyerDtos"
], function (Nexus, BuyerEventNames) {

	var eventHandlers = new Array();

	eventHandlers.push(new Nexus.EventHandler(
		'Save to buyer read model',
		BuyerEventNames.buyerCreatedEventName,
		function(evt){
			Nexus.App.ReadModels.Buyers.insert(new Nexus.App.DTOs.BuyerDTO(evt.id, evt.firstName, evt.lastName, evt.userId, evt.password));
		}	
	));
	
	eventHandlers.push(new Nexus.EventHandler(
		'Notify user of created buyer',
		BuyerEventNames.buyerCreatedEventName,
		function(evt){
			Nexus.App.UI.appendView(evt, 'createdBuyer.html','#output');	
		}	
	));	
	
	return eventHandlers;

});
