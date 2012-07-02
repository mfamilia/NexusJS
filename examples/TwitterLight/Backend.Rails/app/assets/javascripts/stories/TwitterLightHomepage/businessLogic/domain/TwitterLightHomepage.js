TwitterLight.Models.NavigateToHomepage = function () {
  Nexus.EventBus.publish(
    TwitterLight.Events.HomepageShown.Event()
  );
};
