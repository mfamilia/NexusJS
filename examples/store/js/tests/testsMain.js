// Behavior Tests
require([
	"jquery",
	"Nexus",
	"qunit",
	"tests/behaviorTests/buyerTests",
	"tests/behaviorTests/uiTests"
],function($,Nexus,QUnit,BuyerTests,UITests){

	$('#performTest').click(function () {
		BuyerTests.shouldInitBuyers();
		UITests.shouldDisplayLoginForm();
	});
});