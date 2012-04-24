define(function(){
	return function(obj){
	
		this.obj = obj;
	
		this.isValid = function(){
			if (this.obj)
				return true;
			return false;
		};	
	};		

});