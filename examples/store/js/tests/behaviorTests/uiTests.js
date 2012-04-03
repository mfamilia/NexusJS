define([
	"Nexus",
	"app/commands/uiCommands",
	"app/events/uiEvents"
], function (Nexus, UICommands, UIEvents) {


	return {
		
		shouldDisplayLoginForm: function () {		
	
			var whenCommand = new UICommands.StartUICommand();
			var expectEvents = new UIEvents.LoginFormDisplayedEvent();
			
			// example how to pass extra QUnit validators to Nexus testing framework
			var afterTest = function(){
				equal('123','123','no, they are different!')

			};
			
			var expectedApplyFunction = ''; //function(){};
			var expectedTemplate = "loginForm.html";
			var expectedPlaceholder = "#body"
			var expectedData = '';
			
			var expected = {
					template: expectedTemplate,
					placeholder: expectedPlaceholder,
					applyFunction: expectedApplyFunction,
					data: expectedData
				};			
	
			new Nexus
				.Test('Should show login form')
					.BeforeTest()
					    .Given()
					    .When(whenCommand)
					    .Then(expectEvents)
					.AfterTest(afterTest)
				.Run(expected);	
	
		}
			    
	};

});


