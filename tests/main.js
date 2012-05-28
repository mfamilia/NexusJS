require.config({
  paths: {
    'jquery': 'lib/jquery',
    'qunit': 'lib/qunit',    
    'Nexus': 'lib/nexus',
    'NexusTF' : 'lib/nexus.test.framework'
  }
});

// Nexus Tests
require([
	'jquery',
	'Nexus',
	'NexusTF',
	'qunit',
	'js/CreateCachableEventStoreTests',
	'js/DBTests',
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
	'js/UtilTests',
	'js/ValidationTests',
	'js/ViewTestTests'
],function(
	$, 
	Nexus,
	NexusTF,
	QUnit,
	CreateCachableEventStoreTests,
	DBTests,
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
	UtilTests,
	ValidationTests,
	ViewTestTests
	){

	$('#performTest').click(function () {
	
		Nexus.Tests.run([

			CreateCachableEventStoreTests,
			DBTests,
			//LocalStorageArrayListTests,
			//LocalStorageArrayTests,
			//LocalStorageCachableEventStoreTests,
			//LocalStorageCommandBusTests,
			//LocalStorageDBTests,
			SimpleArrayListTests,
			SimpleArrayTests,
			SimpleCachableEventStoreTests,
			SimpleCommandBusTests,
			SimpleDBTests,
			UtilTests,
			ValidationTests,

		]);

	});
});
