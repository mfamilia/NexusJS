define([
    "Nexus",
       'app/stories/TwitterLightHomepage/behavior/events/HomepageShown'
], function (
    Nexus,
    HomepageShown
    ) {
    return function(){
    
		this.NavigateToHomepage = function(
		){
			// You can validate command data
			// example: Nexus.Validatable() and Nexus.Validate()
			/*
			var requiredValidatable = new Nexus.Validatable(
				new RequiredValidator(COMMAND_PARAMETER_TO_VALIDATE),
				function(){
					var msg = 'ERROR MESSAGE';
					Nexus.EventBus.publish(ERROR.Event(msg));							
				}
			);
			
			var minLength = 3;
			var maxLength = 20;
			var lengthValidatable = new Nexus.Validatable(
				new LengthValidator(COMMAND_PARAMETER_TO_VALIDATE, minLength, maxLength), 
				function(){
					var msg = 'ERROR MESSAGE';
					Nexus.EventBus.publish(ERROR.Event(msg));						
				}
			);
		
			Nexus.Validate(
				[requiredValidatable, lengthValidatable],
				function(){						
					Nexus.EventBus.publish(SUCCESS.Event());
				}
			);	
			*/
			
			// You can do an ajax call
			// example: Nexus.BackendCall()
			/*
			new Nexus.BackendCall({
				type: 'GET',
				url: 'http://www.test.com/your/url',
				onSuccess: function(data){
					// publish events
					// example: Nexus.EventBus.publish(ON_SUCCESS.Event());
				},
				onError: function(){
					// publish events
					// example: Nexus.EventBus.publish(ON_ERROR.Event());
				}
			})
			.perform();
			*/
			
			// Or just publish events		
        	Nexus.EventBus.publish(
        		HomepageShown.Event(
        		/*
        		*/
        		) 
        	);

        };
    
      
  
        
        
        // The following is used for rehydration of events from event store if you need to do this
        // If you don't know what this is, you don't need it :)
        this.applyEvent = function(evt){
            //TODO implement
        };
    };
});

