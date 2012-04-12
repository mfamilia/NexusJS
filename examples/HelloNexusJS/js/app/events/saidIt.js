define(function () {

	var SaidIt = {
		eventName:  'Said it',	
		
		Event: function(selector, date, text, viewModel){	
			this.selector = selector;
			this.date = date;
			this.text = text;
			this.eventName = SaidIt.eventName;
		}	
	};
	
	return SaidIt;

});
