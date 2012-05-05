define([
	"Nexus",
	"app/shared/routes",
	'app/features/displayingHomepage/routes',
	'app/features/sayingHello/routes',
	'app/features/sayingIt/routes'
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
