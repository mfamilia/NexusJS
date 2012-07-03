define([
  'nexus',
  'stories/TwitterLightHomepage/behavior/events/HomepageShown'
], function (Nexus, HomepageShown) {

  return {
    register:function () {
      Nexus.Router.registerRoute('#TwitterLightHomepage/HomepageShown', [HomepageShown.Event()]);
    }
  };

});
