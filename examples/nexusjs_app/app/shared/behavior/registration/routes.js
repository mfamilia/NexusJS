define([
	"Nexus",
	"app/shared/behavior/events/errorRaised",
	"app/shared/behavior/events/highlighted"
], function (Nexus, errorRaised, highlighted) {

	return {
		register: function(){
			Nexus.Router.registerRoute('#ERROR:{msg}/highlighted/{selector}',[errorRaised.Event(), highlighted.Event()]);
		}
	};
	
});
