define(function () {

	var Highlighted = {
		eventName:  'Highlighted',	
		
		Event: function(selector){	
			this.selector = selector;
			this.eventName = Highlighted.eventName;
		}	
	};
	
	return Highlighted;

});
