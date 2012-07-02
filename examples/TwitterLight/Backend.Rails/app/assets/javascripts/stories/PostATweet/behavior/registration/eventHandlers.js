TwitterLight.PostATweet.registerEventHandlers = function () {
  Nexus.EventBus.registerEventHandlers([
    TwitterLight.EventHandlers.CallSaveTweetAPI,
    TwitterLight.EventHandlers.ShowThankYouPage,
    TwitterLight.EventHandlers.ShowPostATweetForm,
    TwitterLight.EventHandlers.ShowErrorRaised
  ]);
};


