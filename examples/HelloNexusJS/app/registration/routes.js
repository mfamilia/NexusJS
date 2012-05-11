define([
	"Nexus",
	"app/shared/behavior/registration/routes",
	'app/features/displayingHomepage/behavior/registration/routes',
	'app/features/sayingHello/behavior/registration/routes',
	'app/features/sayingIt/behavior/registration/routes'
], function (
	Nexus,
	sharedRoutes,
	displayingHomepageRoutes,
	sayingHelloRoutes,
	sayingItRoutes
) {

	return {
		register: function(){
			sharedRoutes.register();
			displayingHomepageRoutes.register();
			sayingHelloRoutes.register();
			sayingItRoutes.register();
		}
	}
	
	
});
