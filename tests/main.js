require.config({
  paths: {
    'jquery': 'lib/jquery',
    'qunit': 'lib/qunit',    
    'Nexus': 'lib/nexus'
  }
});

// Nexus Tests
require([
	'jquery',
	'Nexus',
	'qunit',
	'js/CreateCachableEventStoreTests',
	'js/DBTests',
	'js/HelpersTests',
	'js/LocalStorageArrayListTests',
	'js/LocalStorageArrayTests',
	'js/LocalStorageCachableEventStoreTests',
	'js/LocalStorageCommandBusTests',
	'js/LocalStorageDBTests',
	'js/SimpleArrayListTests',
	'js/SimpleArrayTests',
	'js/SimpleCachableEventStoreTests',
	'js/SimpleCommandBusTests',
	'js/SimpleDBTests',
	'js/UtilTests'
],function(
	$, 
	Nexus,
	QUnit,
	CreateCachableEventStoreTests,
	DBTests,
	HelpersTests,
	LocalStorageArrayListTests,
	LocalStorageArrayTests,
	LocalStorageCachableEventStoreTests,
	LocalStorageCommandBusTests,
	LocalStorageDBTests,
	SimpleArrayListTests,
	SimpleArrayTests,
	SimpleCachableEventStoreTests,
	SimpleCommandBusTests,
	SimpleDBTests,
	UtilTests
	){

	$('#performTest').click(function () {
	
		Nexus.Tests.run([
			CreateCachableEventStoreTests,
			DBTests,
			HelpersTests,
			LocalStorageArrayListTests,
			LocalStorageArrayTests,
			LocalStorageCachableEventStoreTests,
			LocalStorageCommandBusTests,
			LocalStorageDBTests,
			SimpleArrayListTests,
			SimpleArrayTests,
			SimpleCachableEventStoreTests,
			SimpleCommandBusTests,
			SimpleDBTests,
			UtilTests
		]);

	});
});