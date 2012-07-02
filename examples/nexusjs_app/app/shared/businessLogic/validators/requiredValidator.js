define(function(){
	return function(obj){
	
		this.obj = obj;
	
		this.isValid = function(){
			return this.obj;			
		};	
	};		

});