require([
	"Nexus"
], function (Nexus) {

	Nexus.App.Services.AggregateService = {
		
		Buyer:	{
			getById: function(id){
				return Nexus.App.EventStore.getById(id, 'Nexus.App.Domain.Buyer');
			},
			getStaticBuyer: function(date, userId, password){
				Nexus.Aggregate.isRehydrating = true;
				var buyer = new Nexus.App.Domain.Buyer(); 
				Nexus.Aggregate.isRehydrating = false;
				return buyer;
			}
		}
	
	};

});





