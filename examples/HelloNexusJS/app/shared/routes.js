define([
	"Nexus",
	"app/shared/events/errorRaised",
	"app/shared/events/highlighted"
], function (Nexus, errorRaised, highlighted) {

	return {
		register: function(){
			Nexus.Router.registerRoute('#ERROR:{msg}',[errorRaised]);
			Nexus.Router.registerRoute('#highlight/{selector}',[highlighted]);		
		}
	};
	
});
