require([
	"Nexus",
	"Nexus.App.Events.BuyerEventNames",
	"Nexus.App.DTOs.BuyerDTOs"
], function (Nexus) {

	var saveToBuyerReadModel = new Nexus.EventHandler(
		'Nexus.App.EventHandlers.BuyerEventHandlers.saveToBuyerReadModel',
		Nexus.App.Events.BuyerEventNames.buyerCreatedEventName,
		function(evt){
			Nexus.App.ReadModels.Buyers.insert(new Nexus.App.DTOs.BuyerDTOs.BuyerDTO(evt.id, evt.firstName, evt.lastName, evt.userId, evt.password));
		}	
	);
	
	var notifyUserOfCreatedBuyer = new Nexus.EventHandler(
		'Nexus.App.EventHandlers.BuyerEventHandlers.notifyUserOfCreatedBuyer',
		Nexus.App.Events.BuyerEventNames.buyerCreatedEventName,
		function(evt){
			Nexus.App.UI.renderView(evt, 'createdBuyer.html','#output');	
		}	
	);	
	
	Nexus.App.EventBus.registerEventHandlers([
		saveToBuyerReadModel,
		notifyUserOfCreatedBuyer
	]);

});
