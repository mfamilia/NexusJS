define([
	"Nexus",
	"app/commands/buyerCommands",
	"app/events/buyerEvents"
], function (Nexus, BuyerCommands, BuyerEvents) {


	Nexus.App.Tests.BuyerTests = {
	
		BACKUP: {
			BUYER_READ_MODEL: Nexus.App.ReadModels.Buyers
		},
		
		beforeEachTest: function(){
			Nexus.App.ReadModels.Buyers = Nexus.CreateSimpleReadModel();
		},
		
		afterEachTest: function(){
			Nexus.App.ReadModels.Buyers = Nexus.App.Tests.BuyerTests.BACKUP.BUYER_READ_MODEL;
		},
	
		shouldInitBuyers: function () {
	
			var buyer1 = 	{
						id: Nexus.App.newId(),
						firstName: 'Buyer',
						lastName: 'One',
						userId: 'bone',
						password: 'pwd'
					};
			var buyer2 = 	{
						id: Nexus.App.newId(),
						firstName: 'Buyer',
						lastName: 'Two',
						userId: 'btwo',
						password: 'pwd'
					};	
	
			var buyers = [buyer1, buyer2];		
	
			var whenCommand = new BuyerCommands.PopulateBuyersCommand(buyers);
			var expectEvents = 	[
							new BuyerEvents.BuyerCreatedEvent(buyer1.id, buyer1.firstName, buyer1.lastName, buyer1.userId, buyer1.password),
							new BuyerEvents.BuyerCreatedEvent(buyer2.id, buyer2.firstName, buyer2.lastName, buyer2.userId, buyer2.password)
						];
	
			new Nexus
				.Test('Should init buyers')
					.BeforeTest(Nexus.App.Tests.BuyerTests.beforeEachTest)
					    .Given()
					    .When(whenCommand)
					    .Then(expectEvents)
					.AfterTest(Nexus.App.Tests.BuyerTests.afterEachTest)
				.Run();  		
	
		},
		
		shouldAuthenticateBuyer: function(){
		
			var buyer1 = 	{
						id: Nexus.App.newId(),
						firstName: 'Buyer',
						lastName: 'One',
						userId: 'bone',
						password: 'pwd'
					};
			var data = {
				//some data
			}
							
			var givenEvents = new BuyerEvents.BuyerCreatedEvent(buyer1.id, buyer1.firstName, buyer1.lastName, buyer1.userId, buyer1.password);
			var whenCommand = new BuyerCommands.AuthenticateBuyerCommand(new Date(), buyer1.userId, buyer1.password); 
			var expectedEvents = new BuyerEvents.BuyerAuthenticatedEvent(data); 
			
			new Nexus
				.Test('Should authenticate buyer')
					.BeforeTest(Nexus.App.Tests.BuyerTests.beforeEachTest)
					    .Given(givenEvents)
					    .When(whenCommand)
					    .Then(expectedEvents)
					.AfterTest(Nexus.App.Tests.BuyerTests.afterEachTest)
				.Run({},1000);			
		},
		
		shouldDisplayHttp404Page: function(){
		
			var buyer1 = 	{
						id: Nexus.App.newId(),
						firstName: 'Buyer',
						lastName: 'One',
						userId: 'bone',
						password: 'pwd'
					};
							
			var givenEvents = new BuyerEvents.BuyerCreatedEvent(buyer1.id, buyer1.firstName, buyer1.lastName, buyer1.userId, buyer1.password);
			var whenCommand = new BuyerCommands.AuthenticateBuyerCommand(new Date(), buyer1.userId, buyer1.password); 
			var expectedEvents = new BuyerEvents.Http404PageDisplayedEvent(); 
			
			new Nexus
				.Test('Should display 404 page')
					.BeforeTest(Nexus.App.Tests.BuyerTests.beforeEachTest)
					    .Given(givenEvents)
					    .When(whenCommand)
					    .Then(expectedEvents)
					.AfterTest(Nexus.App.Tests.BuyerTests.afterEachTest)
				.Run({},3000);			
		}		
	    
	};
	
	return Nexus.App.Tests.BuyerTests;

});


