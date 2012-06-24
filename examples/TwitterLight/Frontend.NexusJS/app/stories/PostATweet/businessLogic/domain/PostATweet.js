define([
    'Nexus',
    'app/stories/PostATweet/behavior/events/SaveTweet',
    'app/stories/PostATweet/behavior/events/ThanksForYourTweetPageShown',
    'app/stories/PostATweet/behavior/events/PostATweetFormShown',
    'app/stories/PostATweet/behavior/events/ErrorRaised',    
    'app/stories/PostATweet/businessLogic/validators/LengthValidator',
    'app/stories/PostATweet/businessLogic/validators/RequiredValidator',
    'app/stories/PostATweet/businessLogic/config/ErrorMessages'
], function (
    Nexus,
    SaveTweet,
    ThanksForYourTweetPageShown,
    PostATweetFormShown,
    ErrorRaised,    
    LengthValidator,
    RequiredValidator,
    ErrorMessages
    ){
    return function(){
    
	this.ShowPostATweetForm = function(){
        	Nexus.EventBus.publish(
        		PostATweetFormShown.Event() 
        	);
        };
    
	this.PostNewTweet = function(Tweet){	
		// rules to pass to validators
		var validData = {
			minLengthOfText: 3,
			maxLengthOfText: 140
		};

		// Nexus.Validatable is created using 3 parameters. 
			// 1) instance of validator 
			// 2) fail function (what to do if validation fails) 
		var lengthValidatable = new Nexus.Validatable(
			new LengthValidator(Tweet, validData.minLengthOfText, validData.maxLengthOfText), 
			function(){
				var msg = ErrorMessages.EM001(validData.minLengthOfText, validData.maxLengthOfText); 
				Nexus.EventBus.publish(ErrorRaised.Event(msg));
			}
		);

		var requiredValidatable = new Nexus.Validatable(
			new RequiredValidator(Tweet),
			function(){
				var msg = ErrorMessages.EM002;
				Nexus.EventBus.publish(ErrorRaised.Event(msg));
			}
		);

		// Nexus.Validate expects 
			// 1) array of validatables or single validatable 
			// 2) pass function (what to do if all validations pass)
			// 3) pass function params [optional]
		Nexus.Validate(
			[lengthValidatable, requiredValidatable],
			function(){						
				Nexus.EventBus.publish(
					SaveTweet.Event(Tweet) 
				);
				Nexus.EventBus.publish(
					ThanksForYourTweetPageShown.Event(
						'Thanks for your tweet',
						Tweet
					) 
				);
				Nexus.EventBus.publish(
					ErrorRaised.Event('') 
				);
			}
		);	

        };
        
    };
});

