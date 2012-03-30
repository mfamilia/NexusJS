define(['Nexus'],function(Nexus){

	Nexus.Tests.DBTests = function(){
		module("DB Tests"); 
		
		test("should not create new DB if incorrect arr is passed", function(){					
			// Arrange
			var arr = new Array();
			
			//Act/Assert
			raises(
			  function(){
			    Nexus.CreateDB(arr);
			  },
			  function(err) {
			    return err.message === 'arr must implement Nexus.Interfaces.Array interface';
			  },
			  'should throw error when interface is not implemented'
			);
	
		});
	};
	
return Nexus.Tests.DBTests;
});
	