define([
	"Nexus",
	'app/features/sayingIt/behavior/events/saidIt'
], function (Nexus, saidIt) {

	return {
		register: function(){
			Nexus.Router.registerRoute('#{text}/has/been/said',[saidIt.Event()]);
		}
	};
	
});
