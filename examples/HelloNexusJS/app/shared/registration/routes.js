define([
	"Nexus",
	"app/shared/events/errorRaised",
	"app/shared/events/highlighted"
], function (Nexus, errorRaised, highlighted) {

	return {
		register: function(){
			Nexus.Router.registerRoute('#ERROR:{msg}/highlighted/{selector}',[errorRaised.Event(), highlighted.Event()]);
		}
	};
	
});
