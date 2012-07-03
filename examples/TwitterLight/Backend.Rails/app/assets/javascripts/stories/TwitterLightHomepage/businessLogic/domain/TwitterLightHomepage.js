define([
  'nexus',
  'stories/TwitterLightHomepage/behavior/events/HomepageShown'
], function (Nexus, HomepageShown) {
  return function () {

    this.NavigateToHomepage = function () {
      Nexus.EventBus.publish(
        HomepageShown.Event()
      );
    };

  };
});

