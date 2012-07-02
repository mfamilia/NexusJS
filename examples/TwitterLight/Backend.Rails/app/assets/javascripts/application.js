// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require tilt-jade/runtime
//= require nexus
//= require config
//= require_tree .

$(function () {
  Nexus.App = {
    ApiUrl:'http://api.nexusjs.com'
  };

  TwitterLight.CommandHandlers.register();
  TwitterLight.EventHandlers.register();
  TwitterLight.Routes.register();

  var redirectToRoute = window.location.hash;

  if (window.location.href.indexOf("tests.html") == -1) {
    // initial route
    Nexus.Router.route('#TwitterLightHomepage/HomepageShown');
  }

  if (redirectToRoute) {
    Nexus.Router.route(redirectToRoute);
  }
});
