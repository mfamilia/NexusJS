require([
	"Nexus"
], function (Nexus) {
	
	Nexus.App.DTOs.BuyerDTOs = {
		BuyerDTO: function (id, firstName, lastName, userId, password) {
		    this.id = id;
		    this.firstName = firstName;
		    this.lastName = lastName;
		    this.userId = userId;
		    this.password = password;
		}	
	};
	
	
	
});







