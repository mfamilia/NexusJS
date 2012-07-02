TwitterLight.Models.PostATweet = function () {
  this.ShowPostATweetForm = function () {
    Nexus.EventBus.publish(
      TwitterLight.Events.PostATweetFormShown.Event()
    );
  };

  this.PostNewTweet = function (tweet) {
    // rules to pass to validators
    var validData = {
      minLengthOfText:3,
      maxLengthOfText:140
    };

    // Nexus.Validatable is created using 3 parameters.
    // 1) instance of validator
    // 2) fail function (what to do if validation fails)
    var lengthValidatable = new Nexus.Validatable(
      new TwitterLight.Validators.LengthValidator(tweet, validData.minLengthOfText, validData.maxLengthOfText),
      function () {
        var msg = TwitterLight.ErrorMessages.EM001(validData.minLengthOfText, validData.maxLengthOfText);
        Nexus.EventBus.publish(TwitterLight.Events.ErrorRaised.Event(msg));
      }
    );

    var requiredValidatable = new Nexus.Validatable(
      new TwitterLight.Validators.RequiredValidator(tweet),
      function () {
        var msg = TwitterLight.ErrorMessages.ErrorMessages.EM002;
        Nexus.EventBus.publish(TwitterLight.Events.ErrorRaised.Event(msg));
      }
    );

    // Nexus.Validate expects
    // 1) array of validatables or single validatable
    // 2) pass function (what to do if all validations pass)
    // 3) pass function params [optional]
    Nexus.Validate(
      [lengthValidatable, requiredValidatable],
      function () {
        Nexus.EventBus.publish(
          TwitterLight.Events.SaveTweet.Event(tweet)
        );
        Nexus.EventBus.publish(
          TwitterLight.Events.ThanksForYourTweetPageShown.Event(
            'Thanks for your tweet',
            tweet
          )
        );
        Nexus.EventBus.publish(
          TwitterLight.Events.ErrorRaised.Event('')
        );
      }
    );

  };

};

