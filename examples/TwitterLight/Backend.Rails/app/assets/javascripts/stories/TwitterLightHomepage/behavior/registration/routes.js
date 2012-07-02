TwitterLight.Homepage.registerRoutes = function () {
  Nexus.Router.registerRoute('#TwitterLightHomepage/HomepageShown', [TwitterLight.Events.HomepageShown.Event()]);
};
