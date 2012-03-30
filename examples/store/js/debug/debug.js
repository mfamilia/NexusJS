require(['Nexus','debug/debugService','debug/queryService','debug/utilService'],function(Nexus,debugService, queryService, utilService){
			
	var clearDiv = function(divId){
		$('#' + divId).html('');
	};									
			
	// Event Repo Queries

	$('#showEvtRepo').click(function () {
		debugService.DisplayEventRepo('evtRepo');
	});

	$('#clearEvtRepo').click(function () {
		debugService.Clear(Nexus.App.EventStore.clear, 'evtRepo');
	});


	$('#showEvtRepoById').click(function () {
		var id = $('#aggregateId').val();
		debugService.DisplayEventRepoById('evtRepoById', id);
	});
	
	$('#replayAllEvents').click(function () {
		Nexus.App.EventStore.replayAllEvents();
	});
	
	


	// Registered Event and Command Handlers

	$('#showAllRegisteredEventHandlers').click(function () {
		debugService.DisplayAllRegisteredEventHandlers('allRegisteredEventHandlers');
	});
	
	$('#unregisterAllEventHandlers').click(function () {
		debugService.UnregisterAllEventHandlers('allRegisteredEventHandlers');
	});											

	$('#showAllRegisteredCommandHandlers').click(function () {
		debugService.DisplayAllRegisteredCommandHandlers('allRegisteredCommandHandlers');
	});
					
	$('#unregisterAllCommandHandlers').click(function () {
		debugService.UnregisterAllCommandHandlers('allRegisteredCommandHandlers');
	});				
	
	// Read Models

	$('#showAllBuyers').click(function () {
		utilService.showArrInDiv(queryService.Buyers.getAll(),'allBuyers');
	});	
	
	$('#showAllSellers').click(function () {
		utilService.showArrInDiv(queryService.Sellers.getAll(),'allSellers');
	});
	
	$('#clearAllBuyers').click(function () {
		debugService.Clear(Nexus.App.ReadModels.Buyers.clear, 'allBuyers');
	});

	// --- Logins
	$('#clearAllLogins').click(function () {
		debugService.Clear(Nexus.App.ReadModels.Logins.clear, 'allLogins');
	});
	$('#showAllLogins').click(function () {
		utilService.showArrInDiv(queryService.Logins.getAll(),'allLogins');
	});	
	
	// --- Failed Logins
	$('#clearAllFailedLogins').click(function () {
		debugService.Clear(Nexus.App.ReadModels.FailedLogins.clear, 'allFailedLogins');
	});
	$('#showAllFailedLogins').click(function () {
		utilService.showArrInDiv(queryService.FailedLogins.getAll(),'allFailedLogins');
	});				

});
