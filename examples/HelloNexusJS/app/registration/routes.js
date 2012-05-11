define([
	"Nexus",
	"app/shared/registration/routes",
	'app/features/displayingHomepage/behavior/registration/routes',
	'app/features/sayingHello/registration/routes',
	'app/features/sayingIt/registration/routes'
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
