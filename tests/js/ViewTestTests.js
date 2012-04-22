define(['Nexus'],function(Nexus){

	Nexus.Tests.HelpersTests = function(){
		module("Nexus.ViewTest() Tests");  	
		
		test("should new up Nexus.ViewTest correctly", function() {
			// Arrange
			var name = 'view test name;'
			var waitTime = 50; //milliseconds																		
			var expectedViewSpyOnInit = {
				data: '',
				template: '',
				placeholder: '',
				onLoad: ''
			};
			
			//Act
			var viewTest = new Nexus.ViewTest(name, waitTime);
	
			// Assert
			equal(viewTest.name, name, 'name should be set correctly');	
			equal(viewTest._waitTime, waitTime, 'waitTime should be set correctly');	
			equal(Nexus.isInTestMode, true, 'should be in test mode');	
			deepEqual(viewTest.viewSpy, expectedViewSpyOnInit, 'should init viewSpy correctly');	
			ok(viewTest.observableNexusView, 'should have observable Nexus.View');
			ok(viewTest._viewAsserts, 'should have view aseerts');

															
		});			


		test("should  ", function() {
			// Arrange

																		
			
			//Act

	
			// Assert

															
		});	

	};

return Nexus.Tests.HelpersTests;
});

