define(function () {

	var SaidIt = {
		eventName:  'Said it',	
		
		Event: function(id, date, text, viewModel){	
			this.id = id;
			this.date = date;
			this.text = text;
			this.eventName = SaidIt.eventName;
		}	
	};
	
	return SaidIt;

});
