// Behavior Tests
require([
	"jquery",
	"Nexus",
	"qunit",
	"tests/behaviorTests/buyerTests"
],function($, Nexus,QUnit){

	$('#performTest').click(function () {
		Nexus.App.Analytics.EnabledForCommands = false;
		Nexus.App.Analytics.EnabledForEvents = false;

		Nexus.App.Tests.BuyerTests.shouldInitBuyers();

		Nexus.App.Analytics.EnabledForCommands = true;
		Nexus.App.Analytics.EnabledForEvents = true;        	        
	});
});