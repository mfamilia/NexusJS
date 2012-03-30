define(['Nexus'], function(Nexus){
	Nexus.App.Services.QueryService = {
		Sellers: {
			getById: Nexus.App.ReadModels.Sellers.getById,
			getByUserId: function(userId){
				var retval = undefined;
				Nexus.App.ReadModels.Sellers.getAll().map(function(obj){
					if (obj.userId == userId){
						retval = obj;
					}			
				});			
				return retval;
			},
			getAll: Nexus.App.ReadModels.Sellers.getAll 
		},
		Buyers: {
			getById: Nexus.App.ReadModels.Buyers.getById,
			getByUserId: function(userId){
				var retval = undefined;
				Nexus.App.ReadModels.Sellers.getAll().map(function(obj){
					if (obj.userId == userId){
						retval = obj;
					}			
				});			
				return retval;
			},		
			getAll: Nexus.App.ReadModels.Buyers.getAll
		},
		Logins: {
			getAll: Nexus.App.ReadModels.Logins.getAll
		},
		FailedLogins: {
			getAll: Nexus.App.ReadModels.FailedLogins.getAll
		}
	};
	
	return Nexus.App.Services.QueryService;
});